import { Router } from 'express';
import {
  subAreaDelete,
  subAreaGet,
  subAreaPost,
  subAreaPut,
} from '../controllers/subArea.controllers.js';
import { noSubArea, validatorSubArea } from '../helpers/db-validators.js';
import { check } from 'express-validator';
import { fieldValidation } from '../middlewares/field-validation.js';

export const subAreaRt = Router();

subAreaRt.get('/subAreas', subAreaGet);
subAreaRt.post(
  '/addSubArea',
  [check('sub_area').custom(validatorSubArea), fieldValidation],
  subAreaPost,
);
subAreaRt.put(
  '/:id',
  [
    check('id').custom(noSubArea),
    check('sub_area').custom(validatorSubArea),
    fieldValidation,
  ],
  subAreaPut,
);
subAreaRt.delete(
  '/:id',
  [check('id').custom(noSubArea), fieldValidation],
  subAreaDelete,
);
