import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Link } from '../routes';

const styles = {
  wrapper: {
    margin: '0 auto',
    width: '80%',
    maxWidth: '1200px',
    display: 'flex',
  },
  brand: {
    borderRight: '2px solid #CCCCCC',
    paddingRight: '1em',
    marginRight: '1em',
  },
  toolbar: {
    padding: 0,
    flex: 1,
  },
  flexContainer: {
    flex: 1,
    display: 'flex',
  },
  anchor: {
    display: 'block',
    textDecoration: 'none',
    marginRight: '16px',
  },
};

class Header extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static" color="default">
        <div className={classes.wrapper}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="title" color="inherit" className={classes.brand}>
              学习激励 DApp
            </Typography>
            <p className={classes.flexContainer}>
              <a href="/" className={classes.anchor}>
                <Typography variant="title" color="inherit">
                  目标列表
                </Typography>
              </a>
              <a href="https://wuhsouyuan.com" target="_blank" className={classes.anchor}>
                <Typography variant="title" color="inherit">
                  乌守祠堂
                </Typography>
              </a>
              <a href="/echartsTest" target="_blank" className={classes.anchor}>
                <Typography variant="title" color="inherit">
                  echartsTest
                </Typography>
              </a>
            </p>
            <Link route="/projects/create">
              <Button variant="raised" color="primary">
                创建目标
              </Button>
            </Link>
          </Toolbar>
        </div>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
