import React from 'react';

import * as actions from '../actions/index';

import serialize from 'form-serialize';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class LogScreen extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();

		const payload = serialize(e.target, {hash:true})

		this.props.dispatch(actions.createGame(payload));
	}
	render() {
		return (
			<div>
			<h1 className='page-header'>Log Game</h1>
			<div className="container">
				<form onSubmit={this.handleSubmit}>
					<input name="user_1_id" type="hidden" value={this.props.current_user.id} />
					<div className="form-group row">
						<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Date Played:</label>
						<div className="col-sm-2">
							<select name="date[month]" className="form-control form-control-sm">
							{(() => {
								const months = Array.from(Array(11).keys()).map((val) => {
									return (
										<option key={"month_"+val} value={val}>{monthNames[val]}</option>
									)
								});
								months.unshift(
									(
										<option key={"month"}>Month</option>
									)
								);

								return months;
							})()}
							</select>
						</div>
						<div className="col-sm-2">
							<select name="date[day]" className="form-control form-control-sm">
							{(() => {
								const days = Array.from(Array(31).keys()).map((val) => {
									return (
										<option key={"day_"+val} value={val}>{val+1}</option>
									)
								});
								days.unshift(
									(
										<option key={"day"}>Day</option>
									)
								);

								return days;
							})()}
							</select>
						</div>
						<div className="col-sm-2">
							<select name="date[year]" className="form-control form-control-sm">
							{(() => {
								const years = Array.from(Array(31).keys()).map((val) => {
									const year = new Date().getFullYear()-val;

									return (
										<option key={"year_"+year} value={year}>{year}</option>
									)
								});
								years.unshift(
									(
										<option key={"year"}>Year</option>
									)
								);

								return years;
							})()}
							</select>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Opponent:</label>
						<div className="col-sm-3">
							<select name="user_2_id" className="form-control form-control-sm">
								{(() => {
									return this.props.users.map((user) => {
										return <option key={"user_"+user.id} value={user.id}>{user.name || user.email}</option>
									});
								})()}
							</select>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Your Score:</label>
						<div className="col-sm-2">
							<input name="user_1_score" type="text" className="form-control" placeholder="" />
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Their Score:</label>
						<div className="col-sm-2">
							<input name="user_2_score" type="text" className="form-control" placeholder="" />
						</div>
					</div>
					<div className="form-group row">
						<div className="col-sm-2"></div>
						<div className="col-sm-2">
							<input type="submit" className="btn btn-primary" value="Save" />
							&nbsp;&nbsp;&nbsp;
							<button type="button" className="btn btn-secondary">Cancel</button>
						</div>
					</div>
				</form>
			</div>
			</div>
		)
	}
}

export default LogScreen;