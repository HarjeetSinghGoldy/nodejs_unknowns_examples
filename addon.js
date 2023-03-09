const addon = require('./build/Release/addon');

console.log(addon.hello()); // Outputs "Hello World!"


// step 1: Next, create a file called "binding.gyp" and add the following code:
{
//   "targets": [
//     {
//       "target_name": "addon",
//       "sources": [ "addon.cpp" ]
//     }
//   ]
// }
// step 2: node-gyp configure build
// step 3: node addon.js
