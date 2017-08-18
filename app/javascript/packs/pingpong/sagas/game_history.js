import { channel, delay } from 'redux-saga'
import { all, race, take, put, call, fork, select, takeEvery, takeLatest, takeFirst, actionChannel, cancelled } from 'redux-saga/effects';

import * as actions from '../actions/index';

// Log in
export function* requestGameHistory(action) {
	try {
		const response = yield yield put(actions.apiRequest('/users/'+action.payload.user_id+'/games'))
		const json = yield response.json();

		if (!response.ok) {
			return yield put(actions.requestGameHistoryFailed(response, json));
		}

		yield put(actions.requestedGameHistory(response,json));
	} catch(e) {
		return yield put(actions.requestGameHistoryFailed({}, {}));
	}
}

export function* watchRequestGameHistory() {
	yield takeLatest(actions.REQUEST_GAME_HISTORY, requestGameHistory);
}
