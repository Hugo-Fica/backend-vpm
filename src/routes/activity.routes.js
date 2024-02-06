import { Router } from 'express';
import {
  activityDelete,
  activityGet,
  activityPost,
  activityPut,
} from '../controllers/activity.controllers.js';
import { noActivity, validatorActivity } from '../helpers/db-validators.js';
import { check } from 'express-validator';
import { fieldValidation } from '../middlewares/field-validation.js';

export const activityRt = Router();

activityRt.get('/activitys', activityGet);
activityRt.post(
  '/newactivity',
  [check('activity').custom(validatorActivity), fieldValidation],
  activityPost,
);
activityRt.put(
  '/:id',
  [
    check('id').custom(noActivity),
    check('activity').custom(validatorActivity),
    fieldValidation,
  ],
  activityPut,
);
activityRt.delete(
  '/:id',
  [check('id').custom(noActivity), fieldValidation],
  activityDelete,
);
