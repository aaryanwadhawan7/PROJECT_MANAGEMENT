import Router from 'express';
import {healthCheck} from '../controllers/healthcheck.controllers.js';
const router = Router ();

// router keeps the track of the healthCheck of our server whether it is running or not!
// http://localhost:8000/ 
// this route or endpoint will call the healthCheckHandler()
router.route('/').get(healthCheck);

export default router;