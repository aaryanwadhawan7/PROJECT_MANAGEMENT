- npm install --save-dev nodemon : This will add nodemon as a dev dependency to your codebase.

- dependencies vs dev-dependencies : dependencies are packages required for the application to func correctly in the production env while dev-dependencies are needed during development and testing.

- CORS_ORIGIN -> http://localhost:portNo -> If not provided then use the port no. 5173 if you are using vite bundler for your React application.

- Custom Error API

```
class ApiError extends Error {
    constructor 
    (statusCode, 
    data, 
    message,
    stack = "",
    errors = []) {
        super (message),
        this.message = message,
        this.statusCode = statusCode,
        this.data = null,
        this.success = false,
        this.errors = errors,

        if (stack) {
            // stack will show where the error occur in the code
            this.stack = stack
        } else {
            Error.captureStackTrace (this, this.constructor)
        }
    }
}
```

- super (attribute) : 
- Get this attribute data from the parent class 
- Used to call the constructor of the parents class

