import "regenerator-runtime/runtime";
import { combineReducers } from 'redux';

import app_navigator from './app_navigator';

const rootReducer = combineReducers({
	app_navigator,
});

export default rootReducer;