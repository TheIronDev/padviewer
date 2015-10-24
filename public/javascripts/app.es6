
// Loading Styles
require('../stylesheets/style.less');

// App Dependencies
import React from 'react';
import { render } from 'react-dom';
import PadViewer from './padviewer.jsx';

// Render the App
render(<PadViewer />, document.getElementById('padviewerApp'));