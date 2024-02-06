import { Router } from 'express';
import {
  userDelete,
  userGet,
  userGetAll,
  userGetById,
  userPost,
  userPut,
} from '../controllers/user.controllers.js';
import { fieldValidation } from '../middlewares/field-validation.js';
import { check } from 'express-validator';
import {
  noUser,
  validatorEmail,
  validatorRole,
  validatorUserName,
} from '../helpers/db-validators.js';

export const userRt = Router();

userRt.get('/users', userGet);
userRt.get('/usersAll', userGetAll);
userRt.get('/:id', userGetById);
userRt.post(
  '/newUser',
  [
    check('email', 'email is not valid').isEmail(),
    check('email', 'email is not valid').custom(validatorEmail),
    check('user_name', 'user name is not valid ').custom(validatorUserName),
    check('role_id').custom(validatorRole),
    check(
      'pass',
      'the password is required and must be more than 6 letters long',
    )
      .isLength({ min: 6 })
      .not()
      .isEmpty(),
    fieldValidation,
  ],
  userPost,
);
userRt.put('/:id', [check('id').custom(noUser), fieldValidation], userPut);
userRt.delete(
  '/:id',
  [check('id').custom(noUser), fieldValidation],
  userDelete,
);
