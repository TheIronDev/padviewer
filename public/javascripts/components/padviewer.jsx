/**
 * PADViewer App Wrapper, that wraps showing the selected monsters
 * Smart Component
 */

import React from 'react';
import classNames from 'classnames';

import { connect } from 'react-redux';
import {addMonster, fetchMonsterList, fetchMonster} from '../actions.es6';

import MonsterCompareList from './monsterCompareList.jsx';
import AddMonster from './addmonster.jsx';



let App = React.createClass({

	componentDidMount() {

		// Component has rendered... lets fetch our monster list
		this.props.dispatch(fetchMonsterList());
	},

	addMonster(monsterId) {
		this.props.dispatch(fetchMonster(monsterId));
	},

	render() {

		let wrapperClass = classNames('padviewer-appWrapper', {
			isLoading: (this.props.monsterCompareList.isFetching || this.props.monsterList.isFetching )
		});

		return (<div className={wrapperClass}>
			<MonsterCompareList monsterList={this.props.monsterCompareList.list} />
			<AddMonster addMonster={this.addMonster} monsterList={this.props.monsterList.list} />
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