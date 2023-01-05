import {
	FunctionConfiguration,
	ListFunctionsCommandInput,
} from "@aws-sdk/client-lambda";
import {
	createLambda,
	createResourcesGroupsTaggingAPI,
	Region,
} from "@local/constants/index";
import { StoreState } from "..";

export const SELECTOR_KEY_LAMBDAS = "lambdas";

const UPDATE_USERS_CACHE = "lambdas/0";
const UPDATE_REGION = "lambdas/1";

export interface ITag {
	Key: string;
	Value: string;
}

export interface ILambda extends FunctionConfiguration {
	Tags: ITag[];
}

export const updateRegion = (region: Region) => (dispatch) => {
	dispatch({
		type: UPDATE_REGION,
		payload: region,
	});
	dispatch(loadLambdas({ region }));
};

export const loadLambdas =
	({ region }: { region?: Region }) =>
	async (dispatch) => {
		// load functions
		let functions = [];
		let next = null;
		const lambda = createLambda(region);
		do {
			const input: ListFunctionsCommandInput = {};
			if (next) {
				input.Marker = next;
			}
			const listResp = await lambda.listFunctions(input);
			functions = functions.concat(listResp.Functions);
			next = listResp.NextMarker;
		} while (next);

		// load tagged resources
		const resources = await createResourcesGroupsTaggingAPI(
			region
		).getResources({
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
	loadingAll: boolean;
	loading: string[];
	region: Region;
	cache: { [resourceId: string]: ILambda };
	tags: { [key: string]: Set<string> };
}

const INITIAL_STATE: LambdasModuleState = {
	loadingAll: true,
	loading: [],
	cache: {},
	tags: {},
	region: "us-west-1",
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
				loadingAll: false,
			};
		case UPDATE_REGION:
			return {
				...state,
				region: payload,
			};
		default:
			return state;
	}
}
