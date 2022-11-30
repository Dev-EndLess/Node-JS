const http = require('http')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

const logEvents = require('./logEvents')
const EventEmitter = require('events')

// https://nodejs.org/api/events.html
class Emitter extends EventEmitter {}
// initialize object
const myEmitter = new Emitter()


const PORT = process.env.PORT || 5000

const server = http.createServer((req, res) => {
  console.log(req.url, req.method)
})

server.listen(PORT, () => console.log(`server is running at port ${PORT}`))


/*
// add listener for the long event
myEmitter.on('log', (msg, msg2) => logEvents(msg, msg2))

setTimeout(() => {
  //Emit event
  myEmitter.emit('log', 'Log event emitted!', 'Complete')
}, 2000)
*/