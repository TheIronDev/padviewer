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
		let noLevelRange = props.level.min === props.level.max;

		return rangedRows.map((row) => {
			if (props[row.key]) {
				let lastRow = noLevelRange ? '' : (<td>{props[row.key].max}</td>);
				return (<tr>
					<td>{row.text}</td>
					<td>{props[row.key].min}</td>
					{lastRow}
				</tr>);
			}
			return '';
		});
	},

	render() {

		let props = this.props || {},
			moreInfoLink = `http://puzzledragonx.com/en/monster.asp?n=${props.id}`;

		return (<div className="padviewer-monster">
			<h3 className="padviewer-monster-name">{props.name}</h3>
			<table className="padviewer-monster-table">
				<tr><td>Type:</td><td colSpan="2">{props.type}</td></tr>
				<tr><td>Element:</td><td colSpan="2">{props.element}</td></tr>
				<tr><td>Cost:</td><td colSpan="2">{props.cost}</td></tr>
				<tr><td>Exp To Max:</td><td colSpan="2">{props.expToMax}</td></tr>
				{this.renderRangeRows()}
			</table>
			<a href={moreInfoLink} target="_blank" className="padviewer-monster-moreInfoLink">More Info (and source)</a>
		</div>);
	}
});