import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/index.js";

import app from "./app.js";
const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(port || 8000, () => {
      console.log(`Application is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error!", err);
  });
