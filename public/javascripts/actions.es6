
// Dependencies
import fetch from 'isomorphic-fetch';

// Action Constants
export const ADD_MONSTER = 'ADD_MONSTER';
export const REMOVE_MONSTER = 'REMOVE_MONSTER';
export const FETCH_MONSTER_LIST = 'FETCH_MONSTER_LIST';
export const RECEIVE_MONSTER_LIST = 'RECEIVE_MONSTER_LIST';


/**
 * The following are action creators. They are used by the appDispatcher to emit out events.
 * With redux... the store acts as a dispatcher, and is where "state" is centralized.
 */

export function addMonster(monster) {
	return { type: ADD_MONSTER, monster: monster };
}

export function removeMonster(monster) {
	return { type: REMOVE_MONSTER, monster: monster };
}

/**
 * This function is meant to indicate we are doing a fetch, so show a wheel or something
 * @returns {{type: string}}
 */
export function requestMonsterList() {
	return { type: FETCH_MONSTER_LIST };
}

/**
 * This action happens when we have received an array of monsters, and is intended to update out state with that list
 * @param monsterList
 * @returns {{type: string}}
 */
export function receiveMonsterList(monsterList) {
	return { type: RECEIVE_MONSTER_LIST, monsterList };
}

/**
 * Following redux convention, this action makes use of redux's middleware, redux-thunk
 * Ultimately it appears that the midleware extends dispatch to be able to return functions
 * instead of requiring only object literals.
 *
 * @returns {Function} Action function with dispatched passed in as an argument
 */
export function fetchMonsterList() {
	return function(dispatch) {

		// Before we make our async call, we are dispatching an event letting our app know it is in a "loading" state
		dispatch(requestMonsterList());

		return fetch('/padx/')
			.then(response => response.json())
			.then(results => {

				dispatch(receiveMonsterList(results));
			});
	};
}