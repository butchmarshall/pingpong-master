
export const CREATE_GAME = 'CREATE_GAME';
export const CREATING_GAME = 'CREATING_GAME';
export const CREATED_GAME = 'CREATED_GAME';
export const CREATE_GAME_FAILED = 'CREATE_GAME_FAILED';

export const createGame = (payload) => ({
	type: CREATE_GAME,
	payload: payload
});


export const createdGame = (response, json) => ({
	type: CREATED_GAME,
	response: response,
	json: json,
});

export const createGameFailed = (response, json) => ({
	type: CREATE_GAME_FAILED,
	response: response,
	json: json,
});