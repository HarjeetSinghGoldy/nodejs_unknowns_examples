const http = require('http');

// Define a function to generate some CPU load
function generateLoad() {
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
}

// Create a server that generates CPU load
const server = http.createServer((req, res) => {
  generateLoad();
  res.end('Hello, world!');
});

// Start the server and begin profiling
server.listen(3000, () => {
  console.log('Server listening on port 3000');
  // Start profiling CPU usage
  console.time('CPU profiling');
});

// Stop profiling and print the results
setTimeout(() => {
  console.timeEnd('CPU profiling');
}, 5000);
