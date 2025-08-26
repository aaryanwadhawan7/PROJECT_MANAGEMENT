import { Router } from 'express';
import { registerUser } from "../controllers/user.controllers.js";
import { userRegisterValidator } from '../validators/index.js';


const router = Router ();

router.route ('/register').post (userRegisterValidator(), Validite, registerUser);
export default router;
