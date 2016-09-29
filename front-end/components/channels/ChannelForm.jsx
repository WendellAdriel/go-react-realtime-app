import React, {Component} from 'react';

class ChannelForm extends Component {
  onSubmit (e) {
    e.preventDefault();
    const node = this.refs.channel;
    const channelName = node.value;
    this.props.addChannel(channelName);
    node.value = '';
  }
  render () {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input
          type="text"
          ref="channel"
        />
      </form>
    )
  }
}

ChannelForm.propTypes = {
  addChannel: React.PropTypes.func.isRequired
}

export default ChannelForm
