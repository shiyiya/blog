import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import './style/app.styl';

ReactDom.render(<App />, document.getElementById('root'));

if (process.env.__DEV__ && module.hot) {
  module.hot.accept();
}
