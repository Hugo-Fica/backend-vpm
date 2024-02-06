import { Router } from 'express';
import { fieldValidation } from '../middlewares/field-validation.js';
import {
  settingPut,
  settingPost,
  settingGet,
} from '../controllers/setting.controllers.js';

export const settingRt = Router();
settingRt.get('/:id', settingGet);
settingRt.post('/addSet', [fieldValidation], settingPost);
settingRt.put('/:id', [fieldValidation], settingPut);
