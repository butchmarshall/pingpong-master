import * as api from './api';
import * as game from './game';
import * as leaderboard from './leaderboard';
import * as game_history from './game_history';

module.exports = {
	...api,
	...game,
	...leaderboard,
	...game_history,
	REHYDRATE: "REHYDRATE",
};