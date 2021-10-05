import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware, connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import app, { AppModuleState, SELECTOR_KEY_APP } from "./modules/app";
import modal, { ModalModuleState, SELECTOR_KEY_MODAL } from "./modules/modal";
import profiles, {
	LambdasModuleState,
	SELECTOR_KEY_LAMBDAS,
} from "./modules/lambdas";

export const history = createBrowserHistory();
const initialState = {};
const middleWare = [thunkMiddleware, routerMiddleware(history)];

const composedEnhancers = compose(applyMiddleware(...middleWare));

export interface StoreState {
	[SELECTOR_KEY_APP]: AppModuleState;
	[SELECTOR_KEY_MODAL]: ModalModuleState;
	[SELECTOR_KEY_LAMBDAS]: LambdasModuleState;
}

const createRootReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		[SELECTOR_KEY_APP]: app,
		[SELECTOR_KEY_MODAL]: modal,
		[SELECTOR_KEY_LAMBDAS]: profiles,
	});

const store = createStore(
	createRootReducer(history),
	initialState,
	composedEnhancers
);

export default store;
