const fs = require('fs')

// crea una cartella se non e' gia esistente
if (!fs.existsSync('./new')) {
  fs.mkdir('./new', (error) => {
    if (error) throw error
    console.log('Cartella Creata')
  })
}

// cancella la cartella
if (fs.existsSync('./new')) {
  fs.rmdir('./new', (error) => {
    if (error) throw error
    console.log('Cartella Rimossa')
  })
}