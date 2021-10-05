import React from "react";

export interface ErrorBoundaryProps {
	errorMsg?: any;
	children: any;
}

type State = {
	hasError: boolean;
	error: any;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
	state: State = {
		hasError: false,
		error: null
	};

	static getDerivedStateFromError(error: Error): State {
		console.log('got derived error: ', error);
		return { hasError: true, error };
	}
	componentDidCatch(error: Error, info: React.ErrorInfo) {
		console.log('caught error: ', error, info);
	}
	render() {
		if (this.state.hasError) {
			if (this.props.errorMsg) {
				return this.props.errorMsg;
			}
			return <div className="dh-err-bound">Something went wrong.</div>;
		}
		return this.props.children;
	}
}
