/* next which is the reference to the next middleware function in the pipeline. */
function log(req, res, next) {
  console.log("Logging ..");
  next(); /* Passes the control to the next middleware. If we don't do this, because we are not 
    terminating the request-response cycle, our request will hang. */
}

// module.exports.log = log; this is wrong find out why
module.exports = log; // this exports a single function log
