const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`, `Number Of CPUS ${numCPUs}`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Fork a new worker when a worker dies
    cluster.fork();
  });
} else {
  // Worker processes
  console.log(`Worker process ${process.pid} started`);

  http.createServer((req, res) => {
    res.writeHead(200);
    console.log("Hello",process.pid)
    res.end('Hello World!\n');
  }).listen(8000);

  console.log(`Worker process ${process.pid} listening on port 8000`);
}


// In this example, we first check if the current process is the master process using cluster.isMaster. If it is, we fork worker processes equal to the number of available CPUs using cluster.fork().

// Each worker process listens on port 8000 and responds to incoming requests with a "Hello World!" message. If a worker process dies, the master process creates a new worker using cluster.fork().

// By using the Cluster module, this application can handle more concurrent connections and distribute the workload across multiple processes, improving performance and reliability.


// If the master process of a Node.js cluster is killed, the entire cluster will be terminated along with all of its worker processes. This is because the master process is responsible for managing the worker processes and coordinating their communication.

// When the master process is killed, the operating system will send a SIGTERM signal to all of the child processes (i.e., the worker processes). By default, the worker processes will immediately terminate when they receive this signal, and the cluster will be shut down.

// To avoid this situation, it is important to implement proper error handling and process monitoring in your Node.js application. You can use a process manager like PM2 or Forever to ensure that your Node.js application is always running, and to automatically restart it if it crashes or is terminated for any reason. Additionally, you can use cluster events and process signals to handle errors and gracefully shut down the cluster if necessary.