import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Toolbar from '@material-ui/core/Toolbar';
import AddIcon from '@material-ui/icons/Add';

const styles = {
    appBar: {
        top: 'auto',
        bottom: 0
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    fabButton: {
        display: 'inherit',
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto'
    }
};
 
function appBar({ loggedIn, showFab, classes }) {
    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <IconButton color="inherit" aria-label="Open drawer">
                    <MenuIcon />
                </IconButton>
                {showFab && <Fab color="secondary" aria-label="Add" className={classes.fabButton}>
                    <AddIcon />
                </Fab>}
                <IconButton color="inherit" aria-label="Open drawer">
                    {loggedIn && <AccountCircle />} 
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default withStyles(styles)(appBar);