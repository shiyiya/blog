import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  sidebar: {
    backGroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
  },
  author: {
    height: '100px',
    backgroundImage: 'url(https://i.loli.net/2018/10/05/5bb7144897e8c.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  avatar: {
    position: 'relative',
    top: '100%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 72,
    height: 72,
  },
  authorSocialLinks: {
    marginTop: '40px',
    textAlign: 'center',
    fontSize: '32px',
  },
  authorDescription: {
    textAlign: 'center',
    padding: '10px',
    marginTop: '-10px',
  },
});

class Sidebar extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.sidebar}>
        <Paper square>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
          >
            <Tab label="Site Info" />
            <Tab label="TOC" />
          </Tabs>
        </Paper>
        <section className={classes.siderBarCentent}>
          <div className={classes.author}>
            <Avatar
              alt="author"
              src="https://runtua.cn/usr/themes/sagiri/img/author.jpg"
              className={classes.avatar}
            />
          </div>
          <div className={classes.authorSocialLinks}>
            <AccountCircle fontSize="large" />
            <AccountCircle fontSize="large" />
            <AccountCircle fontSize="large" />
          </div>
          <Typography className={classes.authorDescription}>
            咦？我是谁？我为什么会在这？
          </Typography>
        </section>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Sidebar);
