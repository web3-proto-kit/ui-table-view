import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props)
    this.consumeMessages();
    this.messages = [{
      "senderId": "uuid",
      "recieverId": "uuid",
      "messageId": "uuid",
      "messagePayload": "message as string here..."
    }];
  }
  consumeMessages() {
    let socket = io('/messages');
    socket.on('messages', function (message) {
      message = JSON.parse(message)
      this.updateFeed(message);
    })
    setTimeout(()=>{
      this.messages.push({
        "senderId": "uuid",
        "recieverId": "uuid",
        "messageId": "uuid",
        "messagePayload": "message as string here..."
      })
    },1000)
  }
  updateFeed(message) {
    this.messages.push(message);
  }

  render() {
    return (
      <BootstrapTable data={this.messages} striped={true} hover={true}>
        <TableHeaderColumn dataField="senderId" isKey={true} dataAlign="center">Sender ID</TableHeaderColumn>
        <TableHeaderColumn dataField="recieverId" dataAlign="center">Receiver ID</TableHeaderColumn>
        <TableHeaderColumn dataField="messageId" dataAlign="center">Message ID</TableHeaderColumn>
        <TableHeaderColumn dataField="messagePayload" dataAlign="center">Message Payload</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default App;
