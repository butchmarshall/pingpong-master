import React from 'react';
import { Provider, connect } from 'react-redux';
import { createNavigator, addNavigationHelpers, NavigationActions } from "react-navigation";

import AppWithNavigationState from "./navigators/app_navigator";
import getStore from './config/store';

class App extends React.Component {
	constructor(props) {
		super(props);

		const store = getStore(props);

		this.state = {
			store: store,
		};
	}

	render() {
		return (
			<Provider store={this.state.store}>
				<AppWithNavigationState />
			</Provider>
		);
	}
}

export default App;