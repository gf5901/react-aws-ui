import { FunctionConfiguration, ListFunctionsCommandInput } from "@aws-sdk/client-lambda";
import { LAMBDA, RESOURCE_GROUPS_TAGGING_API } from "@local/constants/index";
import { StoreState } from "..";

export const SELECTOR_KEY_LAMBDAS = "lambdas";

const UPDATE_USERS_CACHE = "lambdas/0";

export interface ITag {
	Key: string;
	Value: string;
}

export interface ILambda extends FunctionConfiguration {
	Tags: ITag[];
}

export const loadLambdas = () => async (dispatch) => {
	let functions = [];
	let next = null;
	do {
		const input: ListFunctionsCommandInput = {}
		if (next) {
			input.Marker = next;
		}
		const listResp = await LAMBDA.listFunctions(input);
		functions = functions.concat(listResp.Functions);
		next = listResp.NextMarker;
	} while (next);
	const resources = await RESOURCE_GROUPS_TAGGING_API.getResources({
		ResourceTypeFilters: ["lambda"],
	});
	const tagMap = {};
	const tags: { [key: string]: Set<string> } = {};
	resources.ResourceTagMappingList.forEach((r) => {
		tagMap[r.ResourceARN] = r.Tags;
		r.Tags.forEach((tag) => {
			if (tags[tag.Key]) {
				tags[tag.Key].add(tag.Value);
			} else {
				tags[tag.Key] = new Set([tag.Value]);
			}
		});
	});
	const cache = {};
	functions.forEach((f) => {
		cache[f.FunctionArn] = {
			...f,
			Tags: tagMap[f.FunctionArn] || [],
		};
	});
	dispatch({ type: UPDATE_USERS_CACHE, payload: { cache, tags } });
};

export const loadFunction =
	(arn: string) => async (dispatch, getState: () => StoreState) => {
		if (arn) {
			const { lambdas } = getState();
			const { cache, loading } = lambdas;
			if (!cache[arn]) {
				loading.push(arn);
				dispatch({ type: UPDATE_USERS_CACHE, payload: cache });

				dispatch({ type: UPDATE_USERS_CACHE, payload: cache });
			}
		}
	};

export interface LambdasModuleState {
	loading: string[];
	cache: { [resourceId: string]: ILambda };
	tags: { [key: string]: Set<string> };
}

const INITIAL_STATE: LambdasModuleState = {
	loading: [],
	cache: {},
	tags: {},
};

export default function reducer(
	state = INITIAL_STATE,
	action
): LambdasModuleState {
	const { type, payload } = action;
	switch (type) {
		case UPDATE_USERS_CACHE:
			return {
				...state,
				cache: payload.cache,
				tags: payload.tags,
			};
		default:
			return state;
	}
}
