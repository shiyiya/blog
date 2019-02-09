import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    width: '772px',
    margin: '0 auto',
    float: 'left',
    [theme.breakpoints.down('md')]: {
      float: 'none',
    },
  },
  siderWrap: {
    float: 'right',
    width: '315px',
    position: 'static',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  sidebarInner: {
    top: '70px',
  },
});

const WithAside = (WrappedComponentM, WrappedComponentS) => {
  class WithAside extends React.PureComponent {
    state = {
      affix: false,
    };

    componentDidMount() {
      document.addEventListener('scroll', this.scrollHandler);
    }

    componentWillUnmount() {
      document.removeEventListener('scroll', this.scrollHandler);
    }

    scrollHandler = evt => {
      const target = evt.target.scrollingElement;
      if (target.scrollTop >= 26) {
        this.setState({ affix: true });
      } else {
        this.setState({ affix: false });
      }
    };

    render() {
      const { classes, ...props } = this.props;
      const { affix } = this.state;
      return (
        <div className="clearfix">
          <div className={classes.container}>
            <WrappedComponentM {...props} />
          </div>
          <aside className={classes.siderWrap}>
            <div
              className={classes.sidebarInner}
              style={{ position: affix ? 'fixed' : 'static' }}
            >
              <WrappedComponentS {...props} />
            </div>
          </aside>
        </div>
      );
    }
  }

  WithAside.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  return withStyles(styles)(WithAside);
};

export default WithAside;
