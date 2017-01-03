/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var _obj = {results : []}
var requestHandler = function(request, response) {
  console.log(request.url)
  if(request.url === '/classes/messages') {
    if(request.method === 'GET') {
      response.writeHead(200, defaultCorsHeaders)
      response.end(JSON.stringify(_obj))
    }
    if(request.method === 'POST') {
      response.writeHead(201, defaultCorsHeaders)
      request.on('data', (message) => {
        _obj.results.push(JSON.parse(message.toString()))
      })
      response.end()
    }
  } else {
    response.writeHead(404, defaultCorsHeaders)
    response.end()
  }

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

exports.requestHandler = requestHandler;
