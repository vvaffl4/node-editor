/**
 * React renderer.
 */
// Import the styles here to process them with webpack
import '_public/style.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '_/store/store';
import App from './app/App';

ReactDOM.render((
	<Provider store={store}>
		<App/>
	</Provider>
	),
	document.getElementById('app'),
);
