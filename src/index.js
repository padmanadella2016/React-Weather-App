import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <div className='app'>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
