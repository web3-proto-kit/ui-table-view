import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './MessagesTable.css';
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';

const MessagesTable = (props) => {
  let messages = props.messages;
  if (messages.length > 0)
    return (
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SenderID</TableCell>
                <TableCell numeric>ReceieverID</TableCell>
                <TableCell numeric>MessageID</TableCell>
                <TableCell numeric>Message Content</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map(message => {
                return (
                  <TableRow key={message.senderId}>
                    <TableCell>
                      {message.recieverId}
                    </TableCell>
                    <TableCell numeric>{message.senderId}</TableCell>
                    <TableCell numeric>{message.messageId}</TableCell>
                    <TableCell numeric>{message.messagePayload}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
    else {
      return (
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>SenderID</TableCell>
                  <TableCell numeric>ReceieverID</TableCell>
                  <TableCell numeric>MessageID</TableCell>
                  <TableCell numeric>Message Content</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Paper>
          <div id="spinnerContainer">
          <CircularProgress size={50} thickness={5} className="spinner"/>
          </div>
        </div>)
    }
}

export default (MessagesTable);
