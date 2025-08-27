import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controllers.js";
import { userRegisterValidator, userLoginValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

// Register route
router.post("/register", userRegisterValidator(), validate, registerUser);

// Login route
router.post("/login", userLoginValidator(), validate, loginUser);

export default router;
