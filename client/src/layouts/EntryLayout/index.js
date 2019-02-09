import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

import MyDrawer from './Drawer';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: '1100px',
      margin: '0 auto',
    },
  },
  root: {
    width: '100%',
    paddingTop: '64px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '60px',
    },
  },
  grow: {
    flexGrow: 1,
    textAlign: 'left',
    marginLeft: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      textAlign: 'right',
    },
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    color: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing.unit,
    color: theme.palette.background.paper,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
    display: 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  main: {
    maxWidth: '1100px',
    display: 'block',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit * 2,
    },
    padding: `${theme.spacing.unit * 4}px 0`,
  },
});

class Layout extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, children } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <RouterLink to="/">
              <Typography
                color="inherit"
                className={classes.title}
                variant="h6"
                noWrap
              >
                Material-UI
              </Typography>
            </RouterLink>

            <div className={classes.grow}>
              <Button className={classes.button}>Default</Button>
              <Button className={classes.button}>Default</Button>
              <Button className={classes.button}>Default</Button>
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <MyDrawer open={open} handleDrawerClose={this.handleDrawerClose} />
        <main className={classes.main}>{children}</main>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
};

export default withStyles(styles, { withTheme: true })(Layout);
