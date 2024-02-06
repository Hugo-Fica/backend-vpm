import { Router } from 'express';
import {
  projectDelete,
  projectGet,
  projectPost,
  projectPut,
} from '../controllers/project.controller.js';
import { noProject, validatorProject } from '../helpers/db-validators.js';
import { check } from 'express-validator';
import { fieldValidation } from '../middlewares/field-validation.js';

export const projectRt = Router();

projectRt.get('/projects', projectGet);
projectRt.post(
  '/newprojects',
  [check('project').custom(validatorProject), fieldValidation],
  projectPost,
);
projectRt.put(
  '/:id',
  [
    check('id').custom(noProject),
    check('project').custom(validatorProject),
    fieldValidation,
  ],
  projectPut,
);
projectRt.delete(
  '/:id',
  [check('id').custom(noProject), fieldValidation],
  projectDelete,
);
