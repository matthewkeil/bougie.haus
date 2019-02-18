import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    paper: {
      backgroundColor: 'rgb(255, 255, 255)',
      position: 'relative',
      width: 'calc(100%-8vw)',
      margin: '4vw',
      padding: '2rem',
      textAlign: 'center',
      [theme.breakpoints.up('xs')]: {
        margin: '2rem auto',
        width: 'calc(100% - 8rem)'
      },
      [theme.breakpoints.up('sm')]: {
        margin: '4rem auto',
        maxWidth: '32rem',
        width: 'calc(100% - 16rem)'
      }
    },
    input: {
      width: '100%',
      display: 'block'
    },
    logo: {
      display: 'block',
      width: '40%',
      maxWidth: '16rem',
      margin: '0 auto',
      paddingTop: '15%'
    },
    forgot: {
      display: 'block',
      textAlign: 'right',
      marginBottom: '.5rem',
    },
    link: {
      paddingLeft: '.5rem',
      textDecoration: 'none',
    },
    button: {
      color: 'white',
      width: '100%'
    },
    socials: {
      display: 'flex',
      marginTop: '2rem',
      width: '100%',
      '&::before': {
        content: '""',
        flex: '1', 
        marginRight: '1rem',
        marginBottom: '1rem',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.primary.dark
      },
      '&::after': {
        content: '""',
        flex: '1',
        marginLeft: '1rem',
        marginBottom: '1rem',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.primary.dark
      }
    },
    icons: {
      display: 'flex',
      width: '100%',
      alignContent: 'space-between',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: theme.palette.primary.dark,
    },
    icon: {
      width: '20px',
      height: '20px',
    }
  });

const Login = ({classes}) => (
    <Fragment>
        <img className={classes.logo} src="/images/logo-600-600.svg" alt="logo"/>
        <Paper className={classes.paper} elevation={2}> 
            <TextField fullWidth className={classes.input} id="email" label="email" required/>
            <TextField fullWidth className={classes.input} id="password" label="password" required/>
          <Link className={`${classes.forgot} ${classes.link}`} to="/users/register">forgot password?</Link>
          <Button className={classes.button} variant="contained" color="secondary">LOG IN</Button>
          <div className={classes.socials}>or log in with </div>
          <ul className={classes.icons}>
            <li>
              <Link className={classes.icon} to="/users/login/instagram">a</Link>
            </li>
            <li>
              <Link className={classes.icon} to="/users/login/google">a</Link>
            </li>
            <li>
              <Link className={classes.icon} to="/users/login/facebook">a</Link>
            </li>
          </ul>
          <span>no account?<Link className={classes.link} to="/users/register">sign up</Link></span>
        </Paper>
    </Fragment>
);


export default withStyles(styles)(Login);