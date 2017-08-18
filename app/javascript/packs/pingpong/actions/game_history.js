export const REQUEST_GAME_HISTORY = 'REQUEST_GAME_HISTORY';
export const REQUESTED_GAME_HISTORY = 'REQUESTED_GAME_HISTORY';
export const REQUEST_GAME_HISTORY_FAILED = 'REQUEST_GAME_HISTORY_FAILED';

export const requestGameHistory = (user_id) => ({
	type: REQUEST_GAME_HISTORY,
	payload: {
		user_id: user_id,
	}
});

export const requestedGameHistory = (response, body) => ({
	type: REQUESTED_GAME_HISTORY,
	payload: {
		response: response,
		body: body,
	},
});

export const requestGameHistoryFailed = (response, body) => ({
	type: REQUEST_GAME_HISTORY_FAILED,
	payload: {
		response: response,
		body: body,
	},
});