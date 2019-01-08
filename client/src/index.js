import React from 'react';
import ReactDOM from 'react-dom';

import createStore from './redux/store';

import App from './App';

const { persistor, store } = createStore();

ReactDOM.render(<App store={store} persistor={persistor} />, document.getElementById('root'));
