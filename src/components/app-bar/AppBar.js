import React, { Component } from 'react';
import './AppBar.css';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';

const AppBar = (props) => {
  return (
    <nav>
      <IconButton className="menu" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <Badge className="mailIcon" badgeContent={props.messages.length} color="secondary">
        <MailIcon />
      </Badge>
    </nav>
  );
}

export default (AppBar);
