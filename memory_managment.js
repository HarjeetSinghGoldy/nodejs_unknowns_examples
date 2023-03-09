const size = 10; // Allocate 10 bytes of memory
const buffer = Buffer.alloc(size);

// Fill the buffer with random data
for (let i = 0; i < size; i++) {
  buffer[i] = Math.floor(Math.random() * 256);
}

// Print the contents of the buffer
console.log(buffer);

// Free the memory used by the buffer
buffer.fill(0);



// This code creates a new Buffer object with a size of 10 bytes using the Buffer.alloc() method. It then fills the buffer with random data using a loop, and finally prints the contents of the buffer to the console. After the buffer is no longer needed, the buffer.fill(0) method is called to free the memory used by the buffer.

// Note that in most cases, you don't need to manually manage memory in Node.js, as the built-in garbage collector takes care of this for you. However, there may be situations where manual memory management is necessary, such as when working with large amounts of binary data.