const http = require('http');

// Create a server
const server = http.createServer((request, response) => {
  // request contains info about the HTTP request
  // response is how we send back data
  
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write('<h1>Hello Node.js!</h1>');
  response.write('<p>My first server</p>');
  response.end(); // Send the response
});

// Start listening on port 3000
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});