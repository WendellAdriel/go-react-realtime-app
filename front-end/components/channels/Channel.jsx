import React, {Component} from 'react';

class Channel extends Component {
  onClick (e) {
    e.preventDefault();
    const {setChannel, channel} = this.props;
    setChannel(channel);
  }
  render () {
    const {channel} = this.props;
    return (
      <li>
        <a onClick={this.onClick.bind(this)}>
          {channel.name}
        </a>
      </li>
    )
  }
}

Channel.propTypes = {
  channel: React.PropTypes.object.isRequired,
  setChannel: React.PropTypes.func.isRequired
}

export default Channel
