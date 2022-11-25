// https://nodejs.org/api/stream.html

const fs = require('fs')
const path = require('path')

// rs // readable string
const rs = fs.createReadStream(path.join(__dirname, 'files', 'lorem.txt'), 'utf-8')

// ws // writeable strings 
const ws = fs.createWriteStream(path.join(__dirname, 'files', 'newLorem.txt'))

// The readable.pipe() method attaches a Writable stream to the readable, 
// causing it to switch automatically into flowing mode and push
//  all of its data to the attached Writable.
rs.on('data', (dataChunk) => {
  ws.write(dataChunk)
})

// better way to pipe data
rs.pipe(ws)

// https://nodejs.org/api/stream.html#readablepipedestination-options

