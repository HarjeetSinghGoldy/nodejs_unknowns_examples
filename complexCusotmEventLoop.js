const EventEmitter = require('events');

class CustomEventLoop extends EventEmitter {
  constructor() {
    super();

    // Set up the event loop
    this.queues = new Map();
    this.isRunning = false;
  }

  addTask(type, task) {
    if (!this.queues.has(type)) {
      this.queues.set(type, []);
    }

    const queue = this.queues.get(type);
    queue.push(task);

    // Start the event loop if it's not already running
    if (!this.isRunning) {
      this.run();
    }
  }

  run() {
    this.isRunning = true;

    // Process tasks in all queues
    for (const [type, queue] of this.queues) {
      while (queue.length > 0) {
        const task = queue.shift();

        // Emit a 'task' event for each task
        this.emit('task', type, task);

        // Simulate task processing
        setTimeout(() => {
          console.log(`Task ${task.id} of type '${type}' completed`);
        }, task.duration);
      }
    }

    this.isRunning = false;
  }
}

// Create a custom event loop instance
const eventLoop = new CustomEventLoop();

// Add some tasks of different types to the event loop
eventLoop.addTask('high-priority', { id: 1, duration: 2000 });
eventLoop.addTask('low-priority', { id: 2, duration: 1000 });
eventLoop.addTask('high-priority', { id: 3, duration: 3000 });

// Listen for 'task' events and log each task as it's processed
eventLoop.on('task', (type, task) => {
  console.log(`Processing task ${task.id} of type '${type}'`);
});
