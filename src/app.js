import express from 'express';
import cors from 'cors';
import healthCheckRouter from './routes/healthCheck.routes.js';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import { generateAccessAndRefreshToken } from './controllers/user.controllers.js';

dotenv.config();

const app = express ();

// basic configurations
app.use (express.json({limit : "16kb"}));
app.use (cookieParser());
app.use(express.urlencoded({extended : true, limit : "16kb"}));
app.use (express.static("public"));
app.use(cors ({
    origin : process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials : true,
    methods : ["GET", "POST", "PATCH", "UPDATE", "DELETE", "PUT", "OPTIONS"], 
    allowedHeaders : ["Content-type", "Authorization"]
}));

// healthCheck route API handler
// http://localhost:8000/api/v1/healthCheck/ -> calls the healthCheckRouter from the healthCheck.routes.js
app.use('/api/v1/healthCheck', healthCheckRouter);

app.use('/api/v1/auth', authRouter);


// Global error handler
app.use((err, req, res, next) => {
  if (err.statusCode) {
    // our custom ApiError
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
    });
  }

  // fallback for unknown errors
  console.error(err);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

export default app;