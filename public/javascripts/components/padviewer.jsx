/**
 * PADViewer App Wrapper, that wraps showing the selected monsters
 * Smart Component
 */

import React from 'react';
import { connect } from 'react-redux';
import {addMonster} from '../actions.es6';

import AddMonster from './addmonster.jsx'



let App = React.createClass({

	addMonster() {
		let demoMonster = {
			id: 1,
			name: 'test'
		};
		this.props.dispatch(addMonster(demoMonster));
	},

	render() {
		return (<div>
			<AddMonster addMonster={this.addMonster} monsterList={this.props.monsterList} />
		</div>);
	}
});


/**
 * Given a state from our store, what do we want to pass into our App's props?
 * @param state
 * @returns {Object}
 */
function select(state) {
	return {
		monsterCompareList: state.monsterCompareList,
		monsterList: state.monsterList
	};
}

// connect decorates App, giving it  the properties defined in the "select" function as well as a dispatch function
export default connect(select)(App);