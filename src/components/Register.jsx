import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
    paper: {
      backgroundColor: 'rgba(255, 255, 255, .85)',
      position: 'relative',
      width: '100%',
      margin: '0 auto',
      [theme.breakpoints.up('xs')]: {
        maxWidth: '72rem',
        width: 'calc(100% - 4rem)'
      }
    }
  });

const Register = ({classes}) => (
    <Fragment>
        <Paper className={classes.paper}>
            <h1>Register!</h1>
        </Paper>
    </Fragment>
);


export default withStyles(styles)(Register);