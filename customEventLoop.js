const EventEmitter = require('events');

class CustomEventLoop extends EventEmitter {
  constructor() {
    super();

    // Set up the event loop
    this.queue = [];
    this.isRunning = false;
  }

  addTask(task) {
    this.queue.push(task);

    // Start the event loop if it's not already running
    if (!this.isRunning) {
      this.run();
    }
  }

  run() {
    this.isRunning = true;

    // Process tasks in the queue
    while (this.queue.length > 0) {
      const task = this.queue.shift();

      // Emit a 'task' event for each task
      this.emit('task', task);

      // Simulate task processing
      setTimeout(() => {
        console.log(`Task ${task.id} completed`);
      }, task.duration);
    }

    this.isRunning = false;
  }
}

// Create a custom event loop instance
const eventLoop = new CustomEventLoop();

// Add some tasks to the event loop
eventLoop.addTask({ id: 1, duration: 2000 });
eventLoop.addTask({ id: 2, duration: 1000 });
eventLoop.addTask({ id: 3, duration: 3000 });

// Listen for 'task' events and log each task as it's processed
eventLoop.on('task', (task) => {
  console.log(`Processing task ${task.id}`);
});


// In this example, we define a CustomEventLoop class that extends Node.js' built-in EventEmitter class. The CustomEventLoop class maintains a queue of tasks and a flag to indicate whether the event loop is currently running.

// We define two methods on the CustomEventLoop class: addTask() and run(). The addTask() method adds a new task to the queue and starts the event loop if it's not already running. The run() method processes tasks in the queue, emitting a 'task' event for each task and simulating task processing with a setTimeout() call.

// We create a new instance of the CustomEventLoop class and add some tasks to it. We then listen for 'task' events emitted by the event loop and log each task as it's processed.

// Note that this is just a simple example of how to create a custom event loop in Node.js. In practice, you would likely want to define more sophisticated event handling logic, such as handling multiple types of events or implementing a priority queue for tasks.