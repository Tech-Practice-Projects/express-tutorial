# Quick Comands

1. use `npm i morgan` and `npm i helmet` to install these two third party middlewares
2. `npm i config` to install configuration package
3. `npm i debug` installs debug module
4. `npm i pug` a templating engine

# Quick Reference

1. `const config = require("config")`
2. `app.use(express.json())`, `app.use(express.urlencoded({extended : true}))`, `app.use(express.static("public"))`, `app.use(helmet())` some of the common middleware
3. `app.set('view engine', 'pug')` express will internally load this module, no need to use `require`
4. `app.set('views', './views')` optional setting for template engine in order to override the paths to where your templates are stored. In this case it is stored in the **default** location `./views`. All templates will be inside folder called `views`.
5. To modularize your code you need to have all the endpoint api like `courses`, `genres` etc in their own js file and stored under a folder called `routes`. Earlier you would have defined express app as follows

```Javascript
const express = require("express");
const app = express();
```

But when you distribute each endpoint to it's own file this will not work. You will now need to create a router and instead of working with app object we now would work with router object. Finally export this router object from the js file so that this router can be used in index.js.

**courses.js**

```Javascript
const express = require("express");
const router = express.Router(); // returns router object
// ------------------
// note how the route url is just "/:id" instead of "/api/course/:id"
// This is because in index.js below we have said that for any route starting with `/api/courses`
// use this course.js router
router.put("/:id", (req, res) => {

})
// --------------
mosule.exports = router;
```

**index.js**

```Javascript
const express = require("express");
const app = express();
const courses = require("./courses");
// here we are telling express that for any routes that starts with `/api/courses` use the 'courses' router
app.use("/api/courses", courses)
```

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
- `helmet` is considered best practice and it secures you app by setting vaious http headers where is `morgan` is very useful to logging all requests.By default `morgan` logs on the console but we can configure it to write it to log file. Consider the performance effect though.
- There are many middleware functions and using a lot of them in your app can result in slowing your app performance. So it is ideal to have these during development or to use them in prod under only certain conditions. This can be configured using environment variables

## Environments and Configurations

- There are two ways to get the Node environment :
  - `process.env.NODE_ENV` - can be set to to _development_, _testing_, _production_, _stage_ etc, when this is not set it's value is _undefined_.
  - `app.get(env)` - returns the environment that was set for `process.env.NODE_ENV`, if `process.env.NODE_ENV` had no value set then `app.get(env)` returns `development`. The advantage of using this methos is that we avoid scenarios where `env` is undefined.
- This can now be used to configure some peice of code to run only during say _development_

```Javascript
if(app.get("env") === "development"){
    app.use(morgan("tiny"));
}
```

- One topic that goes hand in hand with environment is the topic of storing configuration settings for the application, and overriding those settings in each environment. For example in your development environment you are going to use a different data-base for your mail server.
- npm rc is the most popular node configuration package but the tutor (Mosh) prefers **npm config**.
- The main idea of `npm config` is to create a folder named _config_ and have all the configuration files in this folder. The names of the files in this folder must be exact. Some of the files you can have are:
  - **default.json** - is one json object that define the default configuration settings.
  - **development.json** - here we can define a setting specifically to the development environment. This is one json object where we can override the parameters of the json in the default.json file as well as add new parameters for the object. This can also be a complex object.
  - similar to development.json you can also have **production.json**. This object has all configuration for production environment.
    **Sample json file content**
  ```
  {
      "name" : "My Application",
      "mail" : {
          "host" : "dev-mail-server"
      }
  }
  ```
- The config parameters can now be accessed in say `index.js` file like so `const config = require("config");` and later use the `config` like so `config.get('name')` where `name` is one of the parameters in the `config json` object we defined inside the `config` folder.
- Now, depending on what is set for `NODE_ENV` say `development`or `production` the properties from either `development.json` or `production.json` is used. If nothing is set the one from `default.json` is used.
- You should not save things like password or secrets in config files. These secrets are stored in environment variable. Over the course we have used many environment variables like **NODE_EV**, **PORT** etc. These were set in terminal like so `set PORT=3000` in windows and `export NODE_ENV=production` in mac. This is how we set node environment variables during development where as in production we will most likely have a **configuration panel** for storing our environment variables. So a safe way to store all these passwords and secret is to save it in our environment variables, and read them using our **config module**. - This is how you do that, In `config` folder add a file named `custom-environment-variables.json` the name should be exactly this. This file will have a **mapping of the configuration settings with environment variables**. The password is first set in the environment variable like `set app_password=1234` in your valiable. Then it is mapped in the `custom-environment-variables.json` like so.

```
{
    "mail" : {
        "password" : "app_password"
    }
}
```

- You can now access this password in your code like so `config.get(mail.password)`, note that the password **1234** is not stored anywhere in any filed but is set in as a node environment variable.

# DEBUGGING

- Javascript dev extensively rely on `console.log()` for debugging but it is extremely in convinient. So install debug module and replace all console.log() with debug. refer 03_environment-and-config.js
- In tutorial single line command to run nodemon and DEBUG worked but it din work in my syatem. Could be windows problem need to check. `DEBUG=app:* nodemon 03_environment-and-config.js` :disappointed:

# Templating Engines

- All the api's we implemented so far we returned json objects in the response, sometimes however we need to return **html markups** to the client and that is where we use a templating engine.
- The most popular ones for express are _pug_ / _jade_, _mustache_ and _EJS_
- When you are building resful services for the backend of the client applications you dont't really need a view engine or a templating engine.

# Structuring Express Application

- For every logical part of our application api end point should have seperate files or seperate modules. Say api to deal with `courses` should be in file `courses.js` and one that deals with say authors should be in `authors.js`.
- This is generally a good structuring concention `./routes/<all the routing js files like courses.js>` This route folder will have `home.js` as well representing the home page don't add homepage code in index.js.
- Middlewares should be all put in a folder called **middleware** like **logger.js** and **authenticate.js**
- The folder 04_ExpressAdvanced itself is not structed. i have structed the `vidly app` with it's genres in a seperate folder named `structured-vidly` refer to it for a structed application.

# Database Integration

- We will learn about mongoose database in detail in a seperate section. When you use node and express there are different options available for database integration and you can learn about all the options [here](https://expressjs.com/en/guide/database-integration.html)

# Authentication

- Authentication is outside the scope of express, because express is a minimal light weight framework and it doesn't have an opinion about authentication. We will read about authentication and autherization later in the course to secure our application.
