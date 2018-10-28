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
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';


import './Table.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      "messages": []
    };
    this.consumeMessages(this);
  }
  consumeMessages(ctx) {
    const socket = io('http://localhost:3030/messages');
    let messages = ctx.state.messages.slice();
    let state = ctx;
    socket.on('message', function (msg) {
      ctx.updateFeed(messages, msg, state);
    });
  }
  updateFeed(messages, message, state) {
    console.log(messages);
    messages.push(JSON.parse(message));
    // if (messages.length > 300 && messages !== undefined)
    //   messages = messages.slice(0, 300);
    state.setState({ "messages": messages });
  }

  render() {
    let messages = this.state.messages;
    let classes = this.classes;
    let total = this.state.messages.length;
    return (
      <div>
        <Badge className="mailIcon" badgeContent={total} color="primary">
          <MailIcon />
        </Badge>
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
  }
}

export default (App);
