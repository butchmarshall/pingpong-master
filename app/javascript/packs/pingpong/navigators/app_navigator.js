import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, createNavigator, StackRouter } from 'react-navigation';

import LogScreen from "../containers/log_screen";
import LeaderboardScreen from "../containers/leaderboard_screen";
import HistoryScreen from "../containers/history_screen";

import * as actions from '../actions/index';

export const AppRouter = StackRouter({
	"Leaderboard": {
		screen: LeaderboardScreen,
		path: '',
	},
	"Log": {
		screen: LogScreen,
		path: 'log',
	},
	"History": {
		screen: HistoryScreen,
		path: 'history',
	},
});

class AppWithNavigationState extends React.Component {
	componentDidMount() {
		// Hack to make the header links work
		document.addEventListener('click', (e) => {
			if (e.target.tagName == "A") {
				const action = AppRouter.getActionForPathAndParams(e.target.getAttribute('href').replace(/^\//,''));

				if (action) {
					e.preventDefault();
					window.history.pushState({}, "", e.target.getAttribute('href'));
					this.props.dispatch(action);
				}
			}
		});

		window.onpopstate = (e) => {
			const action = AppRouter.getActionForPathAndParams(window.location.pathname.substr(1));

			if (action) {
				e.preventDefault();
				this.props.dispatch(action);
			}
		};
	}

	render() {
		const {dispatch,nav} = this.props;
		const navigation = addNavigationHelpers({ dispatch, state: nav });

		const ScreenView = AppRouter.getComponentForRouteName(navigation.state.routes[navigation.state.index].routeName);

		return (
			<ScreenView {...this.props} />
		);
	}
}
AppWithNavigationState.router = AppRouter;

const mapStateToProps = (state) => ({
	leaderboard: state.leaderboard,
	current_user: state.current_user,
	users: state.users,
	nav: state.app_navigator,
});

export default connect(mapStateToProps)(AppWithNavigationState);