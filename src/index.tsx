import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import App from "./components/App";
import "./index.scss";
import "./index.mobile.scss";

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById("root")
);
