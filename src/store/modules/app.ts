import { loadLambdas } from "./lambdas";

export const SELECTOR_KEY_APP = "app";

const LOADED = "app/LOADED";
const SET_DARK_MODE = "app/1";

export const init = () => async (dispatch: any) => {
	try {
		// load services
		dispatch(loadLambdas({ region: "us-west-1" }));
	} catch (e) {
		console.error(e);
	}
};

export const setDarkModeAction = (darkMode: boolean) => ({
	type: SET_DARK_MODE,
	payload: darkMode,
});

export interface AppModuleState {
	loading?: boolean;
	darkMode: boolean;
}

const INITIAL_STATE: AppModuleState = {
	loading: true,
	darkMode: localStorage ? localStorage.getItem("dm") === "true" : false,
};

export default function reducer(state = INITIAL_STATE, action): AppModuleState {
	const { type, payload } = action;
	switch (type) {
		case LOADED:
			return {
				...state,
				loading: false,
			};
		case SET_DARK_MODE:
			return {
				...state,
				darkMode: payload,
			};
		default:
			return state;
	}
}
