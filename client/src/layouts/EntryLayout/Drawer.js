import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';

const drawerWidth = 240;
const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    backgroundColor: 'red',
    backgroundImage: 'url(https://i.loli.net/2018/10/05/5bb7144897e8c.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: '50%',
    backgroundRepeat: 'no-repeat',
  },
  card: {
    maxWidth: 345,
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
});

class MyDrawer extends React.PureComponent {
  render() {
    const { classes, theme, open, handleDrawerClose } = this.props;

    return (
      <nav className={classes.drawer}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="Recipe"
                    className={classes.avatar}
                    src="https://runtua.cn/usr/themes/sagiri/img/author.jpg"
                  />
                }
                title="Hello World"
                subheader="This is description."
              />
            </Card>
          </div>
          <Divider />
          <List>
            {['Home'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItem>
          </List>
        </Drawer>
      </nav>
    );
  }
}

MyDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(MyDrawer);
