import { channel, delay } from 'redux-saga'
import { all, race, take, put, call, fork, select, takeEvery, takeLatest, takeFirst, actionChannel, cancelled } from 'redux-saga/effects';

import * as actions from '../actions/index';

// Log in
export function* requestLeaderboard(action) {
	try {
		const response = yield yield put(actions.apiRequest('/users'))
		const json = yield response.json();

		if (!response.ok) {
			return yield put(actions.requestLeaderboardFailed(response, json));
		}

		yield put(actions.requestedLeaderboard(response,json.data));
	} catch(e) {
		return yield put(actions.requestLeaderboardFailed({}, {}));
	}
}

export function* watchRequestLeaderboard() {
	yield takeLatest(actions.REQUEST_LEADERBOARD, requestLeaderboard);
}
