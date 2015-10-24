/**
 * An Element that handles adding a monster to our selected monsters array
 * Simple Component
 */

import React from 'react';


export default React.createClass({

	renderMonsterList() {
		return this.props.monsterList.map((monster) => {
			return (<option>{monster.name}</option>);
		});
	},

	render() {

		return (<div className="padviewer-addMonster">
			<div>Add Monster</div>
			<select>{this.renderMonsterList()}</select>

			<button onClick={this.props.addMonster}>Submit</button>
		</div>);
	}
});