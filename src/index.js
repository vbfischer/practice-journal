import React from 'react';
import ReactDOM from 'react-dom';

import createStore from './redux/store';

import App from './App';

const { store } = createStore();

ReactDOM.render(<App store={store} />, document.getElementById('root'));
