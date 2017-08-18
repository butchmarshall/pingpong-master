import "regenerator-runtime/runtime";
import { combineReducers } from 'redux';

import app_navigator from './app_navigator';
import authentication from './authentication';
import current_user from './current_user';
import users from './current_user';
import leaderboard from './leaderboard';

const rootReducer = combineReducers({
	app_navigator,
	authentication,
	current_user,
	leaderboard,
	users,
});

export default rootReducer;