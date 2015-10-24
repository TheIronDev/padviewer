/**
 * An Element that handles adding a monster to our selected monsters array
 * Simple Component
 */

import React from 'react';


export default React.createClass({

	renderMonsterList() {
		return this.props.monsterList.list.map((monster) => {
			return (<option>{monster.name}</option>);
		});
	},

	render() {

		return (<div>
			<div>Add Monster</div>
			<select>{this.renderMonsterList()}</select>

			<button onClick={this.props.addMonster}>Submit</button>
		</div>);
	}
});