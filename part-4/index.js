const logEvents = require('./logEvents')

const EventEmitter = require('events')

// https://nodejs.org/api/events.html
class MyEmitter extends EventEmitter {}

// initialize object
const myEmitter = new MyEmitter()

// add listener for the long event
myEmitter.on('log', (msg, msg2) => logEvents(msg, msg2))

setTimeout(() => {
  //Emit event
  myEmitter.emit('log', 'Log event emitted!', 'Complete')
}, 2000)
