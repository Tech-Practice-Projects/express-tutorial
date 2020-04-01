const EventEmitter = require("events");
class Logger extends EventEmitter {
  log(message) {
    // inside a class function is called a method and we do not add the key word "function" for a method
    console.log(message); // when log function is called it logs the message on console.
    /* after printing on console it raises an event. Note that instead of using an emitter object we use 
      "this" key word. Indicating that emit will be called on specific Logger object.*/
    this.emit("messageLogEvent", { id: 1 });
  }
}

// module.exports = log; this is what you would have used if you wanted to export a function defined in logger.js
module.exports = Logger; // instead of a function we will now export the Logger class.
