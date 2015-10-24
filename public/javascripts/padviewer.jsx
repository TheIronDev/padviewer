
import React from 'react';
import { createStore } from 'redux';
import padViewerReducers from './reducers/padviewer.es6'

let store = createStore(padViewerReducers);

// Console out our initial state. Dispatch events will be added next
console.log(store.getState());

export default React.createClass({

	render() {
		return (<div>
			Hello World
		</div>);
	}
});