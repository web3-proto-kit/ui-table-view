import React, { Component } from 'react';
import './App.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import io from 'socket.io-client';

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
      messages.push(JSON.parse(msg));
      state.setState({"messages": messages});
      console.log(messages);
    });
    console.log(socket)
  }
  updateFeed(message) {
    this.messages.push(message);
  }

  render() {
    let messages = this.state.messages;
    return (
      <BootstrapTable data={messages} striped={true} hover={true}>
        <TableHeaderColumn dataField="senderId" isKey={true} dataAlign="center">Sender ID</TableHeaderColumn>
        <TableHeaderColumn dataField="recieverId" dataAlign="center">Receiver ID</TableHeaderColumn>
        <TableHeaderColumn dataField="messageId" dataAlign="center">Message ID</TableHeaderColumn>
        <TableHeaderColumn dataField="messagePayload" dataAlign="center">Message Payload</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default App;
