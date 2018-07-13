import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css';
import MyRouter from './myRouter';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MyRouter />, document.getElementById('root'));
registerServiceWorker();
