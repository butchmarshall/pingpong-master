import React from 'react';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

import * as actions from '../actions/index';

const styles = {
	centered: {
		'textAlign': 'center'
	}
};

const getPlayerScore = (game, included) => {
	return game.relationships.players.data.map((player) => {
		for(var i = 0; i < included.length; i++) {
			if (included[i].type === "players" && included[i].id === player.id) {
				return included[i].attributes.score;
			}
		}
		
		return "0";
	}).join("-");
}

const getWinLoss = (game, included, current_user_id) => {
	let myscore = 0,
	theirscore = 0;
	
	game.relationships.players.data.forEach((player) => {
		for(var i = 0; i < included.length; i++) {
			if (included[i].type === "players" && included[i].id === player.id) {
				if (parseInt(included[i].relationships.user.data.id,10) === parseInt(current_user_id,10)) {
					myscore = included[i].attributes.score;
				}
				else {
					theirscore = included[i].attributes.score;
				}
			}
		}
	})
	
	return (myscore > theirscore)? "W" : "L";
}


const getOpponent = (game, included, current_user_id) => {
	let me,
	them;
	
	game.relationships.players.data.forEach((player) => {
		for(var i = 0; i < included.length; i++) {
			if (included[i].type === "players" && included[i].id === player.id) {
				if (parseInt(included[i].relationships.user.data.id,10) === parseInt(current_user_id,10)) {
					me = included[i].relationships.user;
				}
				else {
					them = included[i].relationships.user;
				}
			}
		}
	});
	
	if (them) {
		for(var i = 0; i < included.length; i++) {
			if (included[i].type === "users" && included[i].id === them.data.id) {
				return included[i].attributes.name || included[i].attributes.email;
			}
		}
	}

	return "Unknown";
}

class HistoryScreen extends React.Component {
	componentWillMount() {
		this.props.dispatch(actions.requestGameHistory(this.props.current_user.id));
	}
	render() {
		return (
			<div>
				<h1 className='page-header'>History</h1>
				<table className="table">
					<thead>
						<tr>
							<th style={styles.centered} width="100">Date</th>
							<th>Opponent</th>
							<th style={styles.centered} width="150">Score</th>
							<th style={styles.centered} width="150">Result</th>
						</tr>
					</thead>
					<tbody>
					{(() => {
						if (!this.props.game_history.get("data")) {
							return (
								<tr>
									<td style={styles.centered} colSpan={4}>Loading&hellip;</td>
								</tr>
							);
						}
						const included = this.props.game_history.get("included").toJS();

						return this.props.game_history.get("data").map((game, index) => {
							let date = new Date(game.attributes.played_at*1000);

							return (
								<tr key={game.id}>
									<td style={styles.centered}>{monthNames[date.getMonth()]} {date.getDate()}{((date.getFullYear() < (new Date().getFullYear()))? ", "+date.getFullYear() : "")}</td>
									<td>{getOpponent(game, included)}</td>
									<td style={styles.centered}>{getPlayerScore(game, included)}</td>
									<td style={styles.centered}>{getWinLoss(game, included, this.props.current_user.id)}</td>
								</tr>
							)
						})
					})()}
					</tbody>
				</table>
			</div>
		)
	}
}

export default HistoryScreen;