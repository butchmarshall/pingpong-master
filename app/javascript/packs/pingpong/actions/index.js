import * as api from './api';
import * as game from './game';
import * as leaderboard from './leaderboard';

module.exports = {
	...api,
	...game,
	...leaderboard,
	REHYDRATE: "REHYDRATE",
};