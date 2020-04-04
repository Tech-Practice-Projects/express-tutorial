# Quick Comands

1. use `npm i morgan` and `npm i helmet` to install these two third party middlewares

# MIDDLEWARE

- A middle function is a function that **takes a request object and either returns a response to the request to the client or passes control to another middleware function**.
- Till now in our application we saw two types of middleware of express one was `express.json()` and another was the call back function or the route handler function in all our routing definitions. For example in below code

```Javascript
app.get("/", (req, res) => {
    res.send("Home Page");
})
```

In this the call back function is a routing middleware called route(). It takes a request object and in the above case returns a response to the client. Hence in this case it terminates the request response cycle. Where as the other middleware express.json() returns a **middleware function**. The job of this function is to read the request and if there is a JSON object in the body of the request it will parse the body of the request into a JSON object and then it will set `req.body` property.

- So in runtime this is what happens, when we receive a request from the client, the request goes throw the below pipeline called **REQUEST PROCESSING PIPELINE**. In this pipeline we have one or more middleware function. Each function either terminates the request-response cycle by returning the response object or it will pass control to another middleware function.
  Below displays a pipeline with two middleware function json() - parses the request body into a json object and passes the control to route(). Here at route() we have the request object with the body property `req.body` populated so here we can perform some operations and terminate the request-response cycle by returning a response to the client.

```
Request -------> json() ------> route() ----- > Response
```

- Custom middleware can also be built to handle cross-cutting concerns like logging, authentication, autherization and so on. Express is hence nothing but a bunch of middleware function.

## Custom Middleware.

- Custom Middleware are defined in their own seperate js files and used inside main app like index.js.
- In this tutorial two basic middleware logger and authenticate are called in order and they execute in order as well. Run the app and check the log (01_cutsom-middleware).

## Built-in and [Third Party Middleware](https://expressjs.com/en/resources/middleware.html)

- Some built in middleware functions we will see in this tutorial are `express.json()`, `express.urlencoded()`, `express.static()`. More details and usage in file 02_built-in-and-3rdparty.js
- `helmet` and `morgan` are some of the Third party middleware. More details and usage in file 02_built-in-and-3rdparty.js
- There are many middleware functions and using a lot of them in your app can result in slowing your app performance. So it is ideal to have these during development or to use them in prod under only certain conditions. This can be configured using environment variables
