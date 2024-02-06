import { Router } from 'express';
import {
  roleDelete,
  rolePost,
  rolePut,
  rolesGet,
} from '../controllers/roles.controllers.js';
import { fieldValidation } from '../middlewares/field-validation.js';
import { check } from 'express-validator';
import { existsRole, validatorRole } from '../helpers/db-validators.js';

export const rolesRt = Router();

rolesRt.get('/roles', rolesGet);
rolesRt.post(
  '/newRole',
  [
    check('role', 'role is requerid').not().isEmpty(),
    check('role').custom(existsRole),
    fieldValidation,
  ],
  rolePost,
);
rolesRt.put(
  '/:id',
  [
    check('id').custom(validatorRole),
    check('role', 'role is requerid').not().isEmpty(),
    check('role').custom(existsRole),
    fieldValidation,
  ],
  rolePut,
);
rolesRt.delete(
  '/:id',
  [check('id').custom(validatorRole), fieldValidation],
  roleDelete,
);
