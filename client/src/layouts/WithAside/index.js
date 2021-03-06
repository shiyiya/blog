import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    width: '772px',
    margin: '0 auto',
    float: 'left',
    [theme.breakpoints.down('md')]: {
      float: 'none',
      width: 'auto',
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
  function WithAside({ classes, ...props }) {
    const [affix, setAffix] = useState(false);
    useLayoutEffect(() => {
      const scrollHandler = cb => () => {
        const Y = window.pageYOffset;
        if (Y >= 26) {
          cb(true);
        } else {
          cb(false);
        }
      };
      document.addEventListener('scroll', scrollHandler(setAffix));
      return () => {
        document.removeEventListener('scroll', scrollHandler(setAffix));
      };
    }, []);
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

  WithAside.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  return withStyles(styles)(WithAside);
};

export default WithAside;
