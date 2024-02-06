import { Router } from 'express';
import {
  criteriaDelete,
  criteriaGet,
  criteriaPost,
  criteriaPut,
} from '../controllers/criteria.controllers.js';
import { noCriteria, validatorCriteria } from '../helpers/db-validators.js';
import { check } from 'express-validator';
import { fieldValidation } from '../middlewares/field-validation.js';

export const criteriaRt = Router();

criteriaRt.get('/criterias', criteriaGet);
criteriaRt.post(
  '/newcriteria',
  [check('name').custom(validatorCriteria), fieldValidation],
  criteriaPost,
);
criteriaRt.put(
  '/:id',
  [
    check('id').custom(noCriteria),
    check('name').custom(validatorCriteria),
    fieldValidation,
  ],
  criteriaPut,
);
criteriaRt.delete(
  '/:id',
  [check('id').custom(noCriteria), fieldValidation],
  criteriaDelete,
);
