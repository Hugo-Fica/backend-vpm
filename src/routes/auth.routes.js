import { Router } from 'express';
import { check } from 'express-validator';
import { fieldValidation } from '../middlewares/field-validation.js';
import { login } from '../controllers/auth.controllers.js';

export const authRT = Router();

authRT.post(
  '/login',
  [
    check('email').isEmail(),
    check('pass', 'password is requerid').not().isEmpty(),
    fieldValidation,
  ],
  login,
);
