var StaticServer = require('static-server')
var server = new StaticServer({
  rootPath: './build/',            // required, the root of the server file tree 
  name: 'julces.com',   // optional, will set "X-Powered-by" HTTP header 
  port: 3000,               // optional, defaults to a random port 
  // host: '10.0.0.100',       // optional, defaults to any interface 
  // cors: '*',                 // optional, defaults to undefined 
  followSymlink: true,      // optional, defaults to a 404 error 
})

server.start(function () {
  console.log('Server listening to', server.port)
});