import Immutable from 'immutable';
import * as actions from '../actions/index';

let initialState = Immutable.Map({
	data: undefined,
	included: undefined,
});

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.REQUESTED_GAME_HISTORY:
			state = state.set("data", Immutable.List(action.payload.body.data));
			state = state.set("included", Immutable.List(action.payload.body.included));
			break;
	}

	return state;
}

export default reducer;