import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from './layouts/EntryLayout';
import Index from './pages/index/index';
import Auth from './pages/auth';
import Post from './pages/post';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#00b0ff' },
  },
  typography: {
    useNextVariants: true,
  },
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/post" component={Post} />
        </Switch>
      </Layout>
    </MuiThemeProvider>
  );
}
