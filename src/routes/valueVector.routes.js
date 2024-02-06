import { Router } from 'express';
import { check } from 'express-validator';
import { noValue, noVector } from '../helpers/db-validators.js';
import {
  valuesByVectorGet,
  valuesDelete,
  valuesGet,
  valuesPost,
  valuesPut,
} from '../controllers/valueVector.controllers.js';
import { fieldValidation } from '../middlewares/field-validation.js';

export const valueVectorRT = Router();

valueVectorRT.get('/values', valuesGet);
valueVectorRT.get(
  '/:id',
  [check('id').custom(noVector), fieldValidation],
  valuesByVectorGet,
);
valueVectorRT.post('/newValue', valuesPost);
valueVectorRT.put(
  '/:id',
  [check('id').custom(noValue), fieldValidation],
  valuesPut,
);
valueVectorRT.delete(
  '/:id',
  [check('id').custom(noValue), fieldValidation],
  valuesDelete,
);
