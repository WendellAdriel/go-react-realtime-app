import React, {Component} from 'react';
import ChannelSection from './channels/ChannelSection.jsx';
import UserSection from './users/UserSection.jsx';
import MessageSection from './messages/MessageSection.jsx';
import Socket from '../socket.js';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      channels: [],
      activeChannel: {},
      users: [],
      messages: [],
      connected: false
    };
  }
  componentDidMount () {
    let socket = this.socket = new Socket();
    socket.on('connect', this.onConnect);
    socket.on('disconnect', this.onDisconnect);
    socket.on('channel add', this.onAddChannel);
    socket.on('user add', this.onAddUser);
    socket.on('user edit', this.onEditUser);
    socket.on('user remove', this.onRemoveUser);
    socket.on('message add', this.onMessageAdd);
  }
  addChannel = (name) => {
    this.socket.emit('channel add', {name});
  }
  setChannel = (activeChannel) => {
    this.setState({activeChannel});
    this.socket.emit('message unsubscribe');
    this.setState({messages: []});
    this.socket.emit('message subscribe', {channelId: activeChannel.id});
  }
  setUserName = (name) => {
    this.socket.emit('user edit', {name});
  }
  addMessage = (body) => {
    let {activeChannel} = this.state;
    this.socket.emit('message add', {
      channelId: activeChannel.id,
      body
    });
  }
  onConnect = () => {
    this.setState({connected: true});
    this.socket.emit('channel subscribe');
    this.socket.emit('user subscribe');
  }
  onDisconnect = () => {
    this.setState({connected: false});
  }
  onAddChannel = (channel) => {
    let {channels} = this.state;
    channels.push(channel);
    this.setState({channels});
  }
  onAddUser = (user) => {
    let {users} = this.state;
    users.push(user);
    this.setState({users});
  }
  onEditUser = (editUser) => {
    let {users} = this.state;
    users = users.map(user => {
      if (ediUser.id === user.id) {
        return editUser;
      }
      return user;
    });
    this.setState({users});
  }
  onRemoveUser = (removeUser) => {
    let {users} = this.state;
    users = users.filter(user => {
      return user.id !== removeUser.id;
    });
    this.setState({users});
  }
  onMessageAdd = (message) => {
    let {messages} = this.state;
    messages.push(message);
    this.setState({messages});
  }
  render () {
    return (
      <div className="app">
        <div className="nav">
          <ChannelSection
            {...this.state}
            addChannel={this.addChannel}
            setChannel={this.setChannel}
          />
          <UserSection
            {...this.state}
            setUserName={this.setUserName}
          />
        </div>
        <MessageSection
          {...this.state}
          addMessage={this.addMessage}
        />
      </div>
    )
  }
}

export default App
