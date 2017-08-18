import { channel, delay } from 'redux-saga'
import { all, race, take, put, call, fork, select, takeEvery, takeLatest, takeFirst, actionChannel, cancelled } from 'redux-saga/effects';

import * as actions from '../actions/index';

// Create a game
export function* createGame(action) {
	try {
		const payload = {
			"data": {
				"type": "games",
				"attributes": {
					"played_at": parseInt(Date.parse(action.payload.date.day+"-"+action.payload.date.month+"-"+action.payload.date.year)/1000, 10)
				},
				"relationships": {
					"players": {
						"data": [
							{
								"type": "players",
								"attributes": {
									"user_id": action.payload.user_1_id,
									"score": action.payload.user_1_score,
								}
							},
							{
								"type": "players",
								"attributes": {
									"user_id": action.payload.user_2_id,
									"score": action.payload.user_2_score,
								}
							}
						]
					}
				}
			}
		};

		const response = yield yield put(actions.apiRequest('/games', {
			method: "POST",
			body: JSON.stringify(payload)
		}))
		const json = yield response.json();

		if (!response.ok) {
			return yield put(actions.createGameFailed(response, json));
		}

		yield put(actions.createdGame(response,json.data));
	} catch(e) {
		return yield put(actions.createGameFailed({}, {}));
	}
}

export function* watchCreateGame() {
	yield takeLatest(actions.CREATE_GAME, createGame);
}
