import { body } from "express-validator";

// Registration validator
export const userRegisterValidator = () => [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
  
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Valid email is required"),
  
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

// Login validator
export const userLoginValidator = () => [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Valid email is required"),
  
  body("password")
    .notEmpty().withMessage("Password is required"),
];
