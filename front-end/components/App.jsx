import React, {Component} from 'react';
import ChannelSection from './channels/ChannelSection.jsx';
import UserSection from './users/UserSection.jsx';
import MessageSection from './messages/MessageSection.jsx';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      channels: [],
      activeChannel: '',
      users: [],
      messages: []
    };
  }
  addChannel (name) {
    let {channels} = this.state;
    channels.push({id: channels.length, name});
    this.setState({channels});
    // TODO: Send to Server
  }
  setChannel (activeChannel) {
    this.setState({activeChannel});
    // TODO: Get Channel Messages
  }
  setUserName (name) {
    let {users} = this.state;
    users.push({id: users.length, name});
    this.setState({users});
    // TODO: Send to Server
  }
  addMessage (message) {
    let {messages, users} = this.state;
    let createdAt = new Date;
    let author = users.length > 0 ? users[0].name : 'anonymous';
    let body = message;
    messages.push({id: messages.length, body, createdAt, author});
    this.setState({messages});
    // TODO: Send to Server
  }
  render () {
    return (
      <div className="app">
        <div className="nav">
          <ChannelSection
            {...this.state}
            addChannel={this.addChannel.bind(this)}
            setChannel={this.setChannel.bind(this)}
          />
          <UserSection
            {...this.state}
            setUserName={this.setUserName.bind(this)}
          />
        </div>
        <MessageSection
          {...this.state}
          addMessage={this.addMessage.bind(this)}
        />
      </div>
    )
  }
}

export default App
