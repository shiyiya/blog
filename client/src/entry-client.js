import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDom from 'react-dom';

import App from './App';
import './style/app.styl';

function ClientApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

ReactDom.hydrate(<ClientApp />, document.getElementById('root'));

if (process.env.__DEV__ && module.hot) {
  module.hot.accept();
}
