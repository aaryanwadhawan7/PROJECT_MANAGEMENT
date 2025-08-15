import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
const port = process.env.PORT || 8000;


app.listen (port || 8000, () => {
    console.log(`Application is running on http://localhost:${port}`)
})

