/*
installed using npm i underscore, this adds the package dependency to package.json file.
*/
const _ = require("underscore");
var contains = _.contains([1, 2, 3], 2); // checks if the the second argument is present in the array (1st arg).
console.log(contains);
