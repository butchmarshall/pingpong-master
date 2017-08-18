export const REQUEST_LEADERBOARD = 'REQUEST_LEADERBOARD';
export const REQUESTED_LEADERBOARD = 'REQUESTED_LEADERBOARD';
export const REQUEST_LEADERBOARD_FAILED = 'REQUEST_LEADERBOARD_FAILED';

export const requestLeaderboard = () => ({
	type: REQUEST_LEADERBOARD,
});

export const requestedLeaderboard = (response, body) => ({
	type: REQUESTED_LEADERBOARD,
	payload: {
		response: response,
		body: body,
	},
});

export const requestLeaderboardFailed = (response, body) => ({
	type: REQUEST_LEADERBOARD_FAILED,
	payload: {
		response: response,
		body: body,
	},
});