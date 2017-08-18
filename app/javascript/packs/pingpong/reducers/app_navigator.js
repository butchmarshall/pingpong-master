import {AppRouter} from '../navigators/app_navigator';

const initialAction = AppRouter.getActionForPathAndParams(window.location.pathname.substr(1)) || "NotFound";
const initialState = AppRouter.getStateForAction(initialAction);

const reducer = (state = initialState, action) => {
	const nextState = AppRouter.getStateForAction(action, state);

	// Simply return the original `state` if `nextState` is null or undefined.
	return nextState || state;
};

export default reducer;