import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from 'react-hot-toast';

import { SideNavigation } from '@local/shared/SideNavigation/SideNavigation';
import { ErrorBoundary } from "@local/shared/ErrorBoundary/ErrorBoundary";

import { init, SELECTOR_KEY_APP } from "@local/modules/app";
import { StoreState } from "../store";
import ErrorView from "./views/ErrorView/ErrorView";
import { getPage } from "./App.logic";
import { ConfirmationModal } from "./modals/ConfirmationModal";
import "./App.desktop.scss";
import "./App.mobile.scss";

const App: React.FC = () => {
	const dispatch = useDispatch();
	const { darkMode } = useSelector((state: StoreState) => state[SELECTOR_KEY_APP]);
	useEffect(() => {
		dispatch(init());
	}, []);
	const page = getPage();
	return (
		<div id="app" className="app">
			<ErrorBoundary>
				<SideNavigation loading={false} />
				<main>
					<ErrorBoundary errorMsg={<ErrorView />}>
						{page}
						<ConfirmationModal />
					</ErrorBoundary>
				</main>
				<Toaster toastOptions={{
					style: darkMode ? {
						color: 'rgba(255,255,255,0.87)',
						background: '#333'
					} : {}
				}} />
			</ErrorBoundary>
		</div>
	);
};

export default App;
