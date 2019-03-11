import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';

import WithAside from '../../layouts/WithAside';
import Siderbar from '../../components/Sidebar';

const styles = theme => ({
  card: {
    marginTop: theme.spacing.unit * 3,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit * 2,
    },
  },
  media: {
    height: 250,
    [theme.breakpoints.down('sm')]: {
      height: 140,
    },
  },
  postMeta: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'center',
    color: '#a0a0a0',
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: theme.spacing.unit * 2,
  },
  postMetaItem: {
    color: 'rgba(0, 0, 0, 0.54)',
    display: 'inline-block',
  },
});

function Index({ classes, history }) {
  return (
    <>
      <Card className={classes.card} style={{ marginTop: 0 }}>
        <CardActionArea onClick={() => history.push('/post')}>
          <CardMedia
            className={classes.media}
            image="https://i.loli.net/2018/10/05/5bb7144897e8c.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              MATERIAL-UI
            </Typography>
            <Typography component="p">
              React components that implement Google s Material Design.
            </Typography>
          </CardContent>
        </CardActionArea>
        <Divider />
        <div className={classes.postMeta}>
          <Avatar
            alt="author"
            src="https://runtua.cn/usr/themes/sagiri/img/author.jpg"
            className={classes.avatar}
          />
          <div style={{ flex: 1 }}>
            <Typography inline className={classes.postMetaItem}>
              2018 年 12 月 29 日
            </Typography>
            <Typography inline className={classes.postMetaItem}>
              6 条评论
            </Typography>
          </div>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </Card>

      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://i.loli.net/2018/10/05/5bb7144897e8c.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Title
            </Typography>
            <Typography component="p">
              React components that implement Google s Material Design.
            </Typography>
          </CardContent>
        </CardActionArea>
        <Divider />
        <div className={classes.postMeta}>
          <Avatar
            alt="author"
            src="https://runtua.cn/usr/themes/sagiri/img/author.jpg"
            className={classes.avatar}
          />
          <div style={{ flex: 1 }}>
            <Typography className={classes.postMetaItem}>
              2018 年 12 月 29 日
            </Typography>
            <Typography className={classes.postMetaItem}>6 条评论</Typography>
          </div>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </Card>
    </>
  );
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default WithAside(
  withStyles(styles, { withTheme: true })(Index),
  Siderbar
);
