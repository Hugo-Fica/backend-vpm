import { Router } from 'express';
import {
  areaDelete,
  areaGet,
  areaPost,
  areaPut,
} from '../controllers/area.controllers.js';
import { noArea, validatorArea } from '../helpers/db-validators.js';
import { check } from 'express-validator';
import { fieldValidation } from '../middlewares/field-validation.js';

export const areaRt = Router();

areaRt.get('/areas', areaGet);
areaRt.post(
  '/newArea',
  [check('area').custom(validatorArea), fieldValidation],
  areaPost,
);
areaRt.put(
  '/:id',
  [
    check('id').custom(noArea),
    check('area').custom(validatorArea),
    fieldValidation,
  ],
  areaPut,
);
areaRt.delete(
  '/:id',
  [check('id').custom(noArea), fieldValidation],
  areaDelete,
);
