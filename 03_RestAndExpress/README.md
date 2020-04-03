# Quick Commands

1. `npm i express` install express in your package.
2. `npm i -g nodemon` this helps you dynamically edit youe code and test on localhost:3000 without restart of server. Now instead of using node to run a js script use `nodemon script-name.js`. **Installation has to be global**
3.

# Tips

# Notes

## RESTful Services.

- Client sends request to server via http protocol and server responds via the same protocol to the client.
- REST (Representational State Transer, convention for building these https services.). Simple https protocol principles are used to provide support to CREATE, READ, UPDATE and DELETE data, refered to as CRUD operations.
- EXAMPLE: A customer management app for a movie rental company. This app/client would send http requests like get customer, create customer, update customer etc to an end point exposed at the server side like http://(domain name)/api/customers from server. The customers part in the endpoint is called **resource** in REST world and is a collection of customers. Other **resources** like movies, rentals etc can also be exposed.
- Every http request from the client has a **verb** or a method that tells the request's type or intention. **GET** (READ), **POST** (CREATE), **PUT**(UPDATE), **DELETE** (DELETE) are the verbs in REST.

## EXPRESS
Framework to build web applications and web servers on top of node.

### ENVIRONMENT VARIABLE

- The listener was hard coded earlier as `app.listen(3000)`, while this may work on your development machine, but in production environment when you deply this application to a hosting environment a port is dynamically assigned by the hosting environment.
- This can hence be fixed by using environment variable, typically in hosting environment for node applications we have this environment variable called **PORT**. `const port = process.env.PORT || 3000;` here port is set to process.env.PORT if it's defined or it defaults to 3000.
- An environment variable is a variable that is part of the environment in which the process runs. It's value is set outside this application.
- For testing environment variable you can locally set it using `export PORT=5000` in mac or `set PORT=5000` for windows.

### Route Parameters

- These parameters can be usefull when say trying to get a customer with a specific id, we would hence pass the id as a parameter. Parameters are conventionally defined with a **:** like this `/api/cources/:id`. There can be more than one parameter like `/api/posts/:year/:month`. The params can be accessed in code as `req.params` like `req.params.id` etc.
- QUERY STRING PARAMETERS : these are parameters that we add in the url after **?** for example we can use this url `localhost:3000/api/posts/2018/1?sortBy=name` to get all the posts from Jan 2018 and sort them by name. We use Query String parameter to provide additional data for backend services. The query params are accessed in code as `${req.query}`
- Route parameters are for essential or required values and Query String parameter for anything that is optional.

### POSTMAN

- instructions for 03_get-and-post.js
  - open postman and create a POST, in the url provide something like `http://localhost:3000/api/courses`
  - click on `body` tab and write { name : "New Course" }
  - click on send, you will get a response something like { "id": 4, "name": "New Course" }
