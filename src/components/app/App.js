import React, { Component } from 'react';
import AppBar from "../app-bar/AppBar";
import io from 'socket.io-client';
import Table from '../message-table/MessagesTable';
import _ from 'lodash'

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      messageFeed: []
    }
    setTimeout(this.consumeMessages(this), 1500);
  }
  consumeMessages(app) {
    const socket = io('http://localhost:3030/messages');
    let messages = app.state.messages.slice();
    let pushMessage = _.throttle(this.pushMessage, 1500);
    socket.on('message', function (msg) {
      pushMessage(messages, msg, app);
    });
  }
  pushMessage(messages, message, app) {
    messages.push(JSON.parse(message));
    app.setState({ "messages": messages });
  }
  render() {
    let messages = this.state.messages;
    return (
      <div>
        <AppBar messages={messages}/>
        <Table messages={messages}/>
      </div>
    );
  }
}

export default (App);
