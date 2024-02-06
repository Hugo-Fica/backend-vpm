import { Router } from 'express';
import {
  equip_vector_value_post,
  operational_street_post,
  operational_street_value_post,
  vectorDelete,
  vectorGet,
  vectorGetById,
  vectorPost,
  vectorPut,
} from '../controllers/vector.controllers.js';
import { noVector, validatorVector } from '../helpers/db-validators.js';
import { check } from 'express-validator';
import { fieldValidation } from '../middlewares/field-validation.js';

export const vectorRt = Router();

vectorRt.get('/vectors', vectorGet);
vectorRt.get(
  '/:id',
  [check('id').custom(noVector), fieldValidation],
  vectorGetById,
);
vectorRt.post(
  '/newVector',
  [
    check('vector', 'vector is requerid').not().isEmpty(),
    check('vector').custom((value, { req }) => validatorVector(value, { req })),
    check('area_id', 'area is requerid').not().isEmpty(),
    check('sub_area_id', 'sub_area is requerid').not().isEmpty(),
    check('activity_id', 'activity is requerid').not().isEmpty(),
    check('criteria_id', 'criteria is requerid').not().isEmpty(),
    check('vector').custom(validatorVector),
    fieldValidation,
  ],
  vectorPost,
);
vectorRt.post('/newOp/:vector_id', fieldValidation, operational_street_post);
vectorRt.post('/newEVV', fieldValidation, equip_vector_value_post);
vectorRt.post('/newOSV', fieldValidation, operational_street_value_post);
vectorRt.put(
  '/:id',
  [
    check('id').custom(noVector),
    check('vector').custom((value, { req }) => validatorVector(value, { req })),
    fieldValidation,
  ],
  vectorPut,
);
vectorRt.delete(
  '/:id',
  [check('id').custom(noVector), fieldValidation],
  vectorDelete,
);
