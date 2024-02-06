import { response, request } from 'express';
import { ValueVector } from '../models/valueVector.models.js';
import { User } from '../models/user.models.js';
import { Vector } from '../models/vector.models.js';
import { Area } from '../models/area.models.js';
import { SubArea } from '../models/subArea.models.js';
import { Activity } from '../models/activity.models.js';
import { Criteria } from '../models/criteria.models.js';
import { valueForm } from '../helpers/transformData.js';

export const valuesGet = async (req = request, res = response) => {
  const value = await ValueVector.findAll({
    include: [
      {
        model: User,
        attributes: ['user_name'],
      },
      {
        model: Vector,
        attributes: {
          exclude: [
            'user_id',
            'area_id',
            'sub_area_id',
            'activity_id',
            'criteria_id',
          ],
          include: [
            'availability',
            'power_input',
            'air_velocity',
            'area_m2',
            'fix_q',
            'position',
            'vector',
          ],
        },
        include: [
          { model: Area, attributes: ['name'] },
          { model: SubArea, attributes: ['name'] },
          { model: Activity, attributes: ['name'] },
          { model: Criteria, attributes: ['name'] },
        ],
      },
    ],
    attributes: {
      exclude: ['user_id'],
    },
    raw: true,
  });
  const { newValueForm } = valueForm(value);
  if (value.length !== 0) {
    res.status(200).json(newValueForm);
  } else {
    res.status(200).json({ msg: 'no data in DB' });
  }
};
export const valuesByVectorGet = async (req = request, res = response) => {
  const vectorId = req.params.id;
  const value = await ValueVector.findAll({
    where: { vector_id: vectorId },
    include: [
      {
        model: User,
        attributes: ['user_name'],
      },
      {
        model: Vector,
        attributes: {
          exclude: [
            'user_id',
            'area_id',
            'sub_area_id',
            'activity_id',
            'criteria_id',
            'id',
          ],
          include: [
            'availability',
            'power_input',
            'air_velocity',
            'area_m2',
            'fix_q',
            'position',
            'vector',
          ],
        },
        include: [
          { model: Area, attributes: ['name'] },
          { model: SubArea, attributes: ['name'] },
          { model: Activity, attributes: ['name'] },
          { model: Criteria, attributes: ['name'] },
        ],
      },
    ],
    attributes: {
      exclude: ['user_id', 'vector_id'],
    },
    raw: true,
  });
  const { newValueForm } = valueForm(value);
  if (value.length !== 0) {
    res.status(200).json(newValueForm);
  } else {
    res.status(200).json({ msg: 'no data in DB' });
  }
};
export const valuesPost = async (req = request, res = response) => {
  const { user_id, vector_id, position, value, period } = req.body;
  const newValue = {
    user_id: user_id,
    vector_id: vector_id,
    position: position,
    value: value,
    period: period,
  };
  console.log(period);
  const addValue = ValueVector.build(newValue);
  await addValue.save();
  res.status(200).json({ msg: 'value added to the vector' });
};
export const valuesPut = async (req = request, res = response) => {
  const uid = req.params.id;
  const { id, ...resto } = req.body;
  const upValue = await ValueVector.findByPk(uid);
  await upValue.update(resto);
  res.status(200).json({
    msg: 'update value',
  });
};
export const valuesDelete = async (req = request, res = response) => {
  const uid = req.params.id;
  const deleteValue = await ValueVector.findByPk(uid);
  await deleteValue.destroy({ where: { id: uid } });
  res.status(200).json({
    msg: 'delete value',
  });
};
