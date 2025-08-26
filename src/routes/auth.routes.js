import { Router } from 'express';
import { registerUser } from "../controllers/user.controllers.js";
import { userRegisterValidator } from '../validators/index.js';
import { login } from '../controllers/user.controllers.js';


const router = Router ();

router.route ('/register').post (userRegisterValidator(), Validite, registerUser);
router.route ('/login').post (login);

export default router;
