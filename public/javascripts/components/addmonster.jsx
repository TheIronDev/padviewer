/**
 * An Element that handles adding a monster to our selected monsters array
 * Simple Component
 */

import React from 'react';


export default React.createClass({

	getInitialState() {
		return {
			selectedMonsterId: 1
		}
	},

	renderMonsterList() {
		return this.props.monsterList.map((monster) => {
			return (<option key={monster.id} value={monster.id}>{monster.name}</option>);
		});
	},

	addMonster() {
		let monsterId = this.state.selectedMonsterId;
		this.props.addMonster(monsterId);
	},

	updateSelectedMonster(event) {
		let monsterId = event.target.value;
		this.setState({
			selectedMonsterId: monsterId
		});
	},

	render() {

		return (<div className="padviewer-addMonster">
			<div>Add Monster</div>
			<select className="padviewer-addMonster-select" onChange={this.updateSelectedMonster}>{this.renderMonsterList()}</select>

			<button onClick={this.addMonster}>Submit</button>
		</div>);
	}
});