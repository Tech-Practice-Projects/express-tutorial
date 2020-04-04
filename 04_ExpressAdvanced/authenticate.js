/* next which is the reference to the next middleware function in the pipeline. */
function auth(req, res, next) {
  console.log("Authenticating ..");
  next(); /* Passes the control to the next middleware. If we don't do this, because we are not 
    terminating the request-response cycle, our request will hang. */
}

module.exports = auth; // this exports a single function log
