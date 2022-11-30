const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, message2) => {
  const dateTime = `${format(new Date(), 'yyyMMdd\tHH:mm:ss')}`
  const logItem = `${dateTime}\t${uuid()}\t${message}\t${message2}\n`
  console.log(logItem)
  try {
    // se la cartella logs non esiste
    if (!fs.existsSync(path.join(__dirname, 'logs')))
    // crea la cartalla logs
      await fsPromises.mkdir(path.join(__dirname, 'logs'))
    // e poi crea o aggiungi il file.txt
    await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem)
  } catch (error) {
    console.log(error)
  }
}

module.exports = logEvents


