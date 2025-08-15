import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express ();

// basic configurations
app.use (express.json({limit : "16kb"}));
app.use(express.urlencoded({extended : true, limit : "16kb"}));
app.use (express.static("public"));
app.use(cors ({
    origin : process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials : true,
    methods : ["GET", "POST", "PATCH", "UPDATE", "DELETE", "PUT", "OPTIONS"], 
    allowedHeaders : ["Content-type", "Authorization"]
}));

export default app;