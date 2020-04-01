/*
    One of the core concepts of Node is the concept of events. Lot of node's core functionality is based on events.
    http class in node can be used to build a web server, using this we listen on a port for any http request
    and every time a request is received the http class raises an event. The web server should hence respond to this 
    request by reading the request and returning a response. This is one example, similar to  http class 
    several other classes in node raises different kinds of events and in your code you might be interested to
    respond to those events.
    events module has one class called EventEmitter. This is one of the core building blocks of node and lot of 
    classes are based on this EventEmitter.
*/
const EventEmitter = require("events"); // EventEmitter is a class.
const emitter = new EventEmitter(); // new instance of a class.
/*
emitter object not can be used to call several events function. The two most basic functions we will use are "on"
and "emit". "emit" raises a new event and "on" listens to any event that is raised on the EventEmitter object.
In our case the object is called "emitter".
Note that "on" and "addListener" are both same methods, you can use either. Also, a listener must be registered
before a call to emit is made.
*/
/*
    Listener takes two arguments, the first being the name of the event, the second one is the callback function or 
    the actual listener.
*/
emitter.on("demoEvent", () => {
  console.log("Demo event has occured"); // once the demo event is emitted by emit() function this prints.
});

emitter.on("demoEvent2", arg => {
  // arg is the event argument that is sent by the event when it occurs
  console.log("Demo2 event has occured", arg);
  // console.log(`Demo2 event has occured ${arg}`); // see how this is different from above log.
});

/* Raise an event. This takes one or more arguments, the first argument being the name of the event. 
In this case demo event. */
emitter.emit("demoEvent"); // nothing happens if demo event had no listener.

/*
    When an event is emitted it can send back some arguments emitter.emit("demoEvent2", 1, "http://" and so on)
*/

emitter.emit("demoEvent2", { id: 1, url: "http://" }); // instead of sending multiple args as shown above in the comment, wrap all of them in a single object.
/*
    In real world apps it is rare to use this EventEmitter object (emitter) directly as shown above.
    Usually a new class is created that extends EventEmitter and custom methods that you want for your event 
    is added in this class. In our case this class is defined in logger.js
*/
const Logger = require("./logger"); // capital L because Logger is a class
const logger = new Logger(); // new Logger object.

logger.on("messageLogEvent", arg => {
  // listener registered on the same logger object.
  console.log("Message was logged ", arg);
});

logger.log("Log this message"); // this will event an event so a listener must be registered before this is called.
