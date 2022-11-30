// NodeJS is different from Vanilla JS
// 1 - Node runs on a server - not in a browser ( backend not frontend )
// 2 - The console is the terminal window
console.log('Hello World')
// 3 - global object instead of window object
console.log(global)
// 4 - Has Common Core modules that we will explore
// 5 - CommonJS modules instead of ES6 modules
// 6 - Missing some JS APIs like fetch

const os = require('os')
const path = require('path')

// export functions from other file
const { add, subtract, multiply, divide} = require('./math')

console.log(add(2,3))
console.log(subtract(2,3))
console.log(multiply(2,3))
console.log(divide(2,3))


console.log(os.type()) // mostra il sistema operativo
console.log(os.version()) // mostra la versione dell o.s.
console.log(os.home()) // mostra la directory

console.log(__dirname) // mostra il nome della directory
console.log(__filename) // mostra il nome del file nella directory

console.log(path.dirname(__filename)) // mostra il nome della directory
console.log(path.basename(__filename)) // mostra il nome del file
console.log(path.extname(__filename)) // mostra l'estensione del file

// mostra un oggetto con root, directory, nome, estensione, etc...etc...
console.log(path.parse(__filename))  