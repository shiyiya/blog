import React from 'react';
import { StaticRouter } from 'react-router-dom';

import App from './App';

function ServerApp({ url, context, data, ...props }) {
  return (
    <StaticRouter location={url} context={context}>
      <App initialData={data} {...props} />
    </StaticRouter>
  );
}

export default ServerApp;
