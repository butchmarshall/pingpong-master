import React from 'react';
import * as actions from '../actions/index';

const styles = {
	centered: {
		'textAlign': 'center'
	}
};

class LeaderboardScreen extends React.Component {
	componentWillMount() {
		this.props.dispatch(actions.requestLeaderboard());
	}
	render() {
		return (
			<div>
				<h1 className='page-header'>Leaderboard</h1>
				<table className="table">
					<thead>
						<tr>
							<th style={styles.centered} width="1%">Rank</th>
							<th>Name</th>
							<th style={styles.centered} width="150">Score</th>
							<th style={styles.centered} width="150">Games Played</th>
						</tr>
					</thead>
					<tbody>
					{(() => {
						if (!this.props.leaderboard.get("data")) {
							return (
								<tr>
									<td style={styles.centered} colSpan={4}>Loading&hellip;</td>
								</tr>
							);
						}
	
						return this.props.leaderboard.get("data").map((user, index) => {
							return (
								<tr key={user.id}>
									<td style={styles.centered}>{(index+1)}</td>
									<td>{user.attributes.name || user.attributes.email}</td>
									<td style={styles.centered}>{user.attributes.rank}</td>
									<td style={styles.centered}>{user.attributes.total_games}</td>
									
								</tr>
							)
						})
					})()}
					</tbody>
				</table>
			</div>
		);
	}
}

export default LeaderboardScreen;