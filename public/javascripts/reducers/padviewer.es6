/**
 * This is a redux "reducer".  The intention of reducers is to provide a pure function
 * that, given a state (object literal) and an action (object with type and some attributes),
 * returns the next "version" of state... or it will return the previous state if an unknown
 * action was passed.
 */

import { combineReducers } from 'redux';
import { ADD_MONSTER, REMOVE_MONSTER, FETCH_MONSTER_LIST} from '../actions.es6';

const initialCompareListState = [];
const initialListState = [];
const defaultAction = {type: 'no-op'};


/**
 * Monster Compare List Reducer
 * @param {Array} state - Array of "added" monsters
 * @param {Object} action - object that contains an action "type" and "monster"
 * @returns {Array} newState - the next iteration of the "state" with the action applied to it.
 */
function monsterCompareList (state = initialCompareListState, action = defaultAction) {

	switch (action.type) {
		case ADD_MONSTER:
			return Object.assign([], state, [].concat(state.monsterCompareList, action.monster));
		case REMOVE_MONSTER:
			return Object.assign([], state, state.filter((monster) => (monster.id !== action.monster.id)));
		default:
			return state;
	}
}

/**
 * Monster List Reducer
 * @param {Array} state - Array of "fetched" monsters
 * @param {Object} action - object that contains an action "type" and "monster"
 * @returns {Array} newState - the next iteration of the "state" with the action applied to it.
 */
function monsterList (state = initialListState, action = defaultAction) {

	switch (action.type) {
		case FETCH_MONSTER_LIST:
			return Object.assign([], state, [].concat(state.monsterList, action.monsterList));
		default:
			return state;
	}
}

/**
 * Return a combined set of reducers. Each reducers manages the action for its part of the app
 */
const padViewApp = combineReducers({
	monsterCompareList,
	monsterList
});

export default padViewApp;