/**
 * An Element that displays some helpful monster-related data
 * Simple Component
 */

import React from 'react';

const rangedRows = [
	{key: 'level', text: 'Level Range:'},
	{key: 'hp', text: 'HP Range:'},
	{key: 'atk', text: 'Atk Range:'},
	{key: 'rcv', text: 'RCV Range:'},
	{key: 'sellPrice', text: 'Sell Range:'},
	{key: 'feedExp', text: 'Feed Exp:'}
];

export default React.createClass({

	renderRangeRows() {
		let props = this.props;
		return rangedRows.map((row) => {
			if (props[row.key]) {
				return (<tr><td>{row.text}</td><td>{props[row.key].min}</td><td>{props[row.key].max}</td></tr>)
			}
			return '';
		});
	},

	render() {

		let props = this.props || {};

		return (<div className="padviewer-monster">
			<h3>{props.name}</h3>
			<table className="padviewer-monster-table">
				<tr><td>Type:</td><td>{props.type}</td></tr>
				<tr><td>Element:</td><td>{props.element}</td></tr>
				<tr><td>Cost:</td><td>{props.cost}</td></tr>
				<tr><td>Exp To Max:</td><td>{props.expToMax}</td></tr>
				{this.renderRangeRows()}
			</table>

		</div>);
	}
});