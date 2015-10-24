
// Loading Styles
require('../stylesheets/style.less');

// App Dependencies
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PadViewer from './components/padviewer.jsx';
import padViewerReducers from './reducers/padviewer.es6'


let store = createStore(padViewerReducers);
let rootElement = document.getElementById('padviewerApp');

// Render the App
render(
	<Provider store={store}>
		<PadViewer />
	</Provider>, rootElement);