// https://nodejs.org/dist/latest-v18.x/docs/api/fs.html

const fs = require('fs') //fs = file system
const path = require('path')
const fsPromises = require('fs').promises


// Read the file in the directory
fs.readFile('./files/starter.txt', 'utf-8', (error, data) => {
  if (error) throw error
  console.log(data) // use data.toString() or utf-8 for decode
})


// Better approach for go to specific directory and read the file
fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8', (error, data) => {
  if (error) throw error
  console.log(data)
})


console.log('Hello...')


// Crea un file
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to Meet You',(error) => {
  if (error) throw error
  console.log('Write Complete')

  // aggiungi un file
  fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\n Yes it is',(error) => { // \n\n linebreaks
    if (error) throw error
    console.log('Append Complete')
  })
    fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'),(error) => { // \n\n linebreaks
      if (error) throw error
      console.log('Rename Complete')
    })

  // We start to create callbackhell so... 
  // we can avoid it with async await  
})


// Creare un file con Async Await
const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8') // leggi il file
    console.log(data)

    await fsPromises.unlink(path.join(__dirname, 'files', 'promiseComplete.txt')) // cancella file
    await fsPromises.writeFile(path.join(__dirname, 'files', 'writePromise.txt'), data) // crea file
    await fsPromises.appendFile(path.join(__dirname, 'files', 'writePromise.txt'), '\n\nNice to meet you') // aggiungi file
    await fsPromises.rename(path.join(__dirname, 'files', 'writePromise.txt'), path.join(__dirname, 'files', 'promiseComplete.txt')) // rinomina file
    const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf-8') // leggi il file
    console.log(newData)
  } catch (error) {
    console.error(error)
  }
}
fileOps()

// Exit on uncaught errors
process.on('uncaughtException', error => {
  console.error(`There was an uncaught error: ${error}`)
  process.exit(1)
})