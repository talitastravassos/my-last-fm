import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LastFMProvider from './context/LastFMContext';
import './index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <LastFMProvider>
      <App />
    </LastFMProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
