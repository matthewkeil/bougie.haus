import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';



const styles = theme => ({
    paper: {
      backgroundColor: 'rgb(255, 255, 255)',
      position: 'relative',
      width: 'calc(100%-8vw)',
      height: '100vh',
      margin: '4vw',
      padding: '2rem',
      [theme.breakpoints.up('xs')]: {
        margin: '4rem auto',
        width: 'calc(100% - 8rem)'
      },
      [theme.breakpoints.up('sm')]: {
        margin: '8rem auto',
        maxWidth: '32rem',
        width: 'calc(100% - 16rem)'
      }
    },
    input: {
      width: '100%',
      display: 'block'
    }
  });

const Login = ({classes}) => (
    <Fragment>
        <Paper className={classes.paper} elevation={2}>
            <TextField fullWidth className={classes.inpu} id="email" label="email" placeholder="email address" required/>
            <TextField fullWidth className={classes.inpu} id="password" label="password" placeholder="password" required/>

            {/* <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" /> */}
        </Paper>
    </Fragment>
);


export default withStyles(styles)(Login);