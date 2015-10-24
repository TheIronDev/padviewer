
// Action Constants
export const ADD_MONSTER = 'ADD_TODO';
export const REMOVE_MONSTER = 'REMOVE_MONSTER';
export const FETCH_MONSTER_LIST = 'FETCH_MONSTER_LIST';


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

export function fetchMonsterList() {
	return { type: FETCH_MONSTER_LIST };
}