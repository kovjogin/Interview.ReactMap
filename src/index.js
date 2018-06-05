import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/style.scss';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
