import {EventEmitter} from 'events';

class Socket {
  constructor (ws = new WebSocket(), ee = new EventEmitter()) {
    this.ws = ws;
    this.ee = ee;

    ws.onopen = this.open;
    ws.onmessage = this.message;
    ws.onclose = this.close;
  }

  on (name, fn) {
    this.ee.on(name, fn);
  }

  off (name, fn) {
    this.ee.removeListener(name, fn);
  }

  emit (name, data) {
    const message = JSON.stringify({name, data});
    this.ws.send(message);
  }

  open = () => {
    this.ee.emit('connect');
  }

  message = (e) => {
    try {
      const message = JSON.parse(e.data);
      this.ee.emit(message.name, message.data);
    } catch (err) {
      this.ee.emit('error', err);
    }
  }

  close = () => {
    this.ee.emit('disconnect');
  }
}

export default Socket;
