import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
    paper: {
      backgroundColor: 'rgb(255, 255, 255)',
      position: 'relative',
      width: '100%',
      height: '100vh',
      margin: '0 auto',
      [theme.breakpoints.up('xs')]: {
        maxWidth: '72rem',
        width: 'calc(100% - 4rem)'
      }
    }
  });

const Login = ({classes}) => (
    <Fragment>
        <Paper className={classes.paper} elevation={2}>
            <h1>Login</h1>
        </Paper>
    </Fragment>
);


export default withStyles(styles)(Login);