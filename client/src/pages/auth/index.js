import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { signin } from '../../common/api';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
  },
  section: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const ACTION_TYPE = ['Sign in', 'Sign up'];

class Auth extends React.Component {
  state = {
    open: false,
    username: '',
    password: '',
    value: 0,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  formHandler(e) {
    e.preventDefault();
    signin({ ...this.state }).then(_ => {
      console.log(_.data);
    });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleTabChange}>
              <Tab label="Sign in" className={classes.tab} />
              <Tab label="Sign Up" className={classes.tab} />
            </Tabs>
          </AppBar>
          <section className={classes.section}>
            <Avatar className={classes.avatar}>
              {value ? <AccountCircle /> : <LockOutlinedIcon />}
            </Avatar>
            <Typography component="h1" variant="h5">
              {ACTION_TYPE[value]}
            </Typography>
            <form
              className={classes.form}
              onSubmit={this.formHandler.bind(this)}
            >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">User name</InputLabel>
                <Input
                  id="name"
                  name="name"
                  autoComplete="email"
                  autoFocus
                  onChange={this.handleChange('username')}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange('password')}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign in
              </Button>
            </form>
          </section>
        </Paper>
      </main>
    );
  }
}

Auth.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Auth);
