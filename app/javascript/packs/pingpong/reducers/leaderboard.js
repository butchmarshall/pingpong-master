import Immutable from 'immutable';
import * as actions from '../actions/index';

let initialState = Immutable.Map({
	data: undefined
});

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.REQUESTED_LEADERBOARD:
			state = state.set("data", Immutable.List(action.payload.body))
			break;
	}

	return state;
}

export default reducer;