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

JWT (JsonWebToken)
- [With Data] and [Without Data]
- Usually two copies of token are there, one with user and other with DB.
- Access Token (Expires within a short timespan) and Refresh Token (Expires after a long time span compared to Access token)
- Everytime we SignIn to our account we have provide the server with Access Token and If our access token expires user has to provide server with refresh token.

Generating Access/Refresh Token Boilerplate

``` 
import jwt from 'jsonwebtoken';
UserSchema.methods.generatingAccessToken = function () {
    return jwt.sign (
        {
            _id : this._id,
            username : this.username,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresin : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};
```

Generating Temporary Token Boilerplate

``` 
UserSchema.methods.generateTempToken = function () {
    const unHashedToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

    const tokenExpiry = Date.now() + (20*60*1000);

    return {unHashedToken, hashedToken, tokenExpiry};
}
```

- Generating mail template : using mailgen npm package
- How to send email in nodejs ??? <br>
mailgen : Generate email template (HTML) <br>

mailtrap : Used to send email (Sandbox -> locally && API/SMTP -> production)
- Decide whether I have to use locally or for production. (I am using Sandbox for now...)
- Copy host, port, username and password in env (environment variable).
- Also add env var like 
APP_URL, 
MAIL_FROM_NAME and 
MAIL_FROM_EMAIL

- nodemailer.createTransport [Take data from the sandbox]
- mailgen -> theme, product -> name, link
- Define sendTemplateEmail func.
- 'node testEmail.js' to chdck the generated email via mailtrap

Simple Workflow (Registeration)
1. take some data
2. validate the data
3. check DB if user already exist
4. SAVED the new user
5. user verification : email
6. Response to the request

- Fix Cookies Logic and Add more routes for my backend project



