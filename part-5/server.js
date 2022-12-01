const http = require('http')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

const logEvents = require('./logEvents')
const EventEmitter = require('events')

// https://nodejs.org/api/events.html
class Emitter extends EventEmitter { }
// initialize object
const myEmitter = new Emitter()
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName))

const PORT = process.env.PORT || 5000


// function to server the file
const serveFile = async (filePath, contentType, response) => {
  try {
    // serving images with serverFile function
      const rawData = await fsPromises.readFile(
          filePath,
          !contentType.includes('image') ? 'utf8' : ''
      );
    // serving JSON with serverFile function
      const data = contentType === 'application/json'
          ? JSON.parse(rawData) : rawData
      response.writeHead(
        // Sending a 404 status code
          filePath.includes('404.html') ? 404 : 200,
          { 'Content-Type': contentType }
      );
      response.end(
          contentType === 'application/json' ? JSON.stringify(data) : data
      );
  } catch (err) {
      console.log(err)
      myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt')
      response.statusCode = 500
      response.end()
  }
}

const server = http.createServer((req, res) => {
  console.log(req.url, req.method)
  // log request and errors in log folder in txt extension
  myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt')

  const extension = path.extname(req.url)

  let contentType

  // setting the content type 
  // check extensions
  switch (extension) {
      case '.css':
          contentType = 'text/css'
          break;
      case '.js':
          contentType = 'text/javascript'
          break;
      case '.json':
          contentType = 'application/json'
          break;
      case '.jpg':
          contentType = 'image/jpeg'
          break;
      case '.png':
          contentType = 'image/png'
          break;
      case '.txt':
          contentType = 'text/plain'
          break;
      default:
          contentType = 'text/html'
  }

  // Setting the file path
  let filePath =
  contentType === 'text/html' && req.url === '/'
      ? path.join(__dirname, 'views', 'index.html')
      : contentType === 'text/html' && req.url.slice(-1) === '/'
          ? path.join(__dirname, 'views', req.url, 'index.html')
          : contentType === 'text/html'
              ? path.join(__dirname, 'views', req.url)
              : path.join(__dirname, req.url)

    // makes .html extension not required in the browser
    // add in automatic html at the end of the path
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html'

    // check if file exist // true or false
    const fileExists = fs.existsSync(filePath)


    if (fileExists) {
        // call the function to serveFile
        serveFile(filePath, contentType, res)
    } else {
        // routing redirects
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page.html' })
                res.end()
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' })
                res.end()
                break;
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
        }
    }
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

