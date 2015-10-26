
// Polyfills
import 'babel-core/polyfill';

// Loading Styles
import '../stylesheets/octicons.less';
import '../stylesheets/style.less';

// App Dependencies
import React from 'react';
import { render } from 'react-dom';

// Redux Related
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

// Redux Middleware
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
const loggerMiddleware = createLogger();

// Our app
import PadViewer from './components/padviewer.jsx';
import padViewerReducers from './reducers/padviewer.es6'


const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware, // lets us dispatch() functions
	loggerMiddleware // neat middleware that logs actions
)(createStore);


let store = createStoreWithMiddleware(padViewerReducers);
let rootElement = document.getElementById('padviewerApp');

// Render the App
render(
	<Provider store={store}>
		<PadViewer />
	</Provider>, rootElement);