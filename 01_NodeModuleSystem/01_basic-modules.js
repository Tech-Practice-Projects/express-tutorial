const path = require("path"); // Path module can be used while working with file paths
const os = require("os"); // gives information about current operating system
const fs = require("fs");
// __filename and __dirname are two of the args passed into every module (js files) in Node.
// -------------------------------------- path -----------------------------------------------
const pathObj = path.parse(__filename);
/*
pathObj looks like this

{
  root: 'C:\\',
  dir: 'C:\\Users\\upadh\\Documents\\PersonalProject\\CodeWithMosh\\The Complete Node.js Course\\CompleteNodeCourse\\NodeModuleSystem',
  base: 'path-module.js',
  ext: '.js',
  name: 'path-module'
}
*/
console.log(pathObj);
// ---------------------------------- OS ------------------------------------------------------------
/*
Some useful methods in os object are freemem(), totalmem(), userInfo([options]), uptime() etc
*/

var freemem = os.freemem();
var totalmem = os.totalmem();
/*
Prints soemthing like Free Mem : 8764387328, Total mem : 17013760000. We could not get info about OS
by just running JS in a browser.
*/
console.log(`Free Mem : ${freemem}, Total mem : ${totalmem}`);
// ----------------------------------------- file system --------------------------------------------
/*
  fs has many useful function. Every operation defined here comes in two variation Asyn and Sync.
  in real world apps we always use Async type. A node process has a single thread, if you are using node to build 
  a backend server for your application you might have several 100s or 1000s of clients connecting to that backend.
  If you keep that single thread busy by using blocking methods (Sysnc methods) you wont be able to serve many clients.
*/
/* Sync form of readdir. This will read all files in the given path ex. './' and return the name of the files as a
   string array.
*/
const files = fs.readdirSync("./"); // files is a string array of all files in './'.
console.log(files); //example [' basic-modules.js ']

/*
  Async form of readdir. All Async methods take a function as it's last argument. When any Async function completes
  node will call this function. We call this function a "callback" function.
*/

fs.readdir("./", (err, result) => {
  // call back function gives two params err and String[] string array
  if (err) console.log(err);
  // if say the given path './' is invalid then error is thrown
  else console.log(result); // if all goes well result string array will all file names is returned.
});

// ------------------------ http (read event-module.js before reading below section) -----------------

/*
Used for creating networking applicattions. We can create a web server that listens for http request on a 
given port. With this we can easily create a back end service for our client applications like a web app built with 
React or Angular or mobile app running on mobile device.
In http module you will see various classes like http.Agent, http.ClientRequest and so on. Each of these classes 
have multiple properties, methods and events.
*/
const http = require("http");
/*
 This server is an event emitter. It has all the capabilty of an EventEmitter object, like emit and on methods.
 Class : http.Server inherits from net.Server and net.Server is an EventEmitter.
*/
const server = http.createServer();
/*
    This is a listener for an event named "connection" (this is in built event name).
    The second argument is a callback function that gives a socket argument.
*/
server.on("connection", socket => {
  console.log("New Connection.."); // run thsi file and open http://localhost:3000 on a browser to see this log.
});
/*
Listens on port 3000 for a new http connection, everytime there is a http request it raises an event.
Note that the listen method listens for http request say when you open http://localhost:3000/ in your browser.
and then it emits an event called "connection". We handle this "connection" event above by registering a listener.
*/
server.listen(3000);
console.log("Listening on port 3000"); // this will be logged on your console. when you run the file. Might not be the last log.
// read http-module for more advanced understanding of http
