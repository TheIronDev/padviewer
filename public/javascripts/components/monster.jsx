/**
 * An Element that displays some helpful monster-related data
 * Simple Component
 */

import React from 'react';

const rangedRows = [
	[{key: 'level', text: 'Level Range:'}, {key: 'hp', text: 'HP Range:'}],
	[{key: 'atk', text: 'Atk Range:'},{key: 'rcv', text: 'RCV Range:'}],
	[{key: 'sellPrice', text: 'Sell Range:'}, {key: 'feedExp', text: 'Feed Exp:'}]
];

export default React.createClass({

	renderRangeRows() {
		let props = this.props;
		let noLevelRange = props.level.min === props.level.max;

		return rangedRows.map((row) => {
			return (<tr>{row.map((item) => {
				if (props[item.key]) {
					let lastRow = noLevelRange ? '' : (<td>{props[item.key].max}</td>);
					return (<span>
						<td className="txtBold">{item.text}</td>
						<td>{props[item.key].min}</td>
					{lastRow}
					</span>);
				}
				return '';
			}) }</tr>);
		});
	},

	render() {

		let props = this.props || {},
			moreInfoLink = `http://puzzledragonx.com/en/monster.asp?n=${props.id}`,
			renderSkill = props.skill ? `Skill: ${props.skill}` : '',
			renderLeaderSkill = props.leaderSkill ? `Leader Skill: ${props.skill}` : '';

		return (<div className="padviewer-monster">
			<h3 className="padviewer-monster-name">{props.name}</h3>
			<table className="padviewer-monster-table">
				<tr>
					<td className="txtBold">Type:</td><td colSpan="2">{props.type}</td>
					<td className="txtBold">Element:</td><td colSpan="2">{props.element}</td>
				</tr>
				<tr>
					<td className="txtBold">Cost:</td><td colSpan="2">{props.cost}</td>
					<td className="txtBold">Exp To Max:</td><td colSpan="2">{props.expToMax}</td>
				</tr>
				{this.renderRangeRows()}
				<tr><td className="txtBold">Skill:</td><td colSpan="5">{props.skill}</td></tr>
				<tr><td className="txtBold">Leader Skill:</td><td colSpan="5">{props.leaderSkill}</td></tr>
			</table>
			<a href={moreInfoLink} target="_blank" className="padviewer-monster-moreInfoLink">More Info (and source)</a>
		</div>);
	}
});