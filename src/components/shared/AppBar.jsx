import React, { Fragment, Component } from "react";
import { Link } from 'react-router-dom';

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

const styles = {
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between"
  }
};

class appBar extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    
    const { user, classes } = this.props;
    const { anchorEl } = this.state;

    const open = Boolean(anchorEl);

    return (
      <AppBar position="fixed" color="primary">
        <Toolbar className={classes.toolbar}>
          {!!!user ? (
            <IconButton href={`/users/${user.id}`}>
              <MenuIcon color="secondary"/>
            </IconButton>
          ) : (
            <Fragment>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
                color="inherit"
              >
                <AccountCircle color="secondary"/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  <Link to="/users/login">Login</Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link to="/users/register">Register</Link>
                </MenuItem>
              </Menu>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}
// {showFab && <Fab color="secondary" aria-label="Add" className={classes.fabButton}>
//     <AddIcon />
// </Fab>}

export default withStyles(styles)(appBar);
