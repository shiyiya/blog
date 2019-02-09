import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from './layouts/EntryLayout';
import Index from './pages/index/index';
import Auth from './pages/auth';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#293854' },
  },
  typography: {
    useNextVariants: true,
  },
});

export default function App() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/auth" component={Auth} />
          </Switch>
        </Layout>
      </MuiThemeProvider>
    </Router>
  );
}
