import React from 'react';
import { Route, Switch, useLocation } from "react-router-dom";

import NotFoundView from "./views/NotFoundView/NotFoundView";
import ContactView from './views/ContactView/ContactView';
import ErrorView from './views/ErrorView/ErrorView';
import LambdaView from './views/LambdaView/LambdaView';

export const getPage = () => {
	const location = useLocation();
	const page = (
		<Switch location={location}>
			<Route exact strict path="/" component={ErrorView} />
			<Route exact strict path="/lambda" component={LambdaView} />
			<Route exact strict path="/lambda/:resourceId" component={ErrorView} />
			<Route exact strict path="/:service/resource/:resourceId" component={ErrorView} />
			<Route exact strict path="/:service/tag/:tag" component={ErrorView} />
			<Route exact strict path="/contact" component={ContactView} />
			<Route exact strict path="/404" component={NotFoundView} />
			<Route component={NotFoundView} />
		</Switch>
	);
	return page;
}