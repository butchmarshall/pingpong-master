import q from 'q';
import { all } from 'redux-saga/effects';

import {
	watchCreateGame,
} from './games';

import {
	watchRequestLeaderboard,
} from './leaderboard';

export default function* root() {
	yield all([
		watchCreateGame(),
		watchRequestLeaderboard(),
	]);
}