import { response, request } from 'express';
import { Vector } from '../models/vector.models.js';
import { User } from '../models/user.models.js';
import { Area } from '../models/area.models.js';
import { SubArea } from '../models/subArea.models.js';
import { Activity } from '../models/activity.models.js';
import { Criteria } from '../models/criteria.models.js';
import { vectorForm } from '../helpers/transformData.js';
import { ValueVector } from '../models/valueVector.models.js';
import { Operational_Streets } from '../models/operational_streets.models.js';
import { Equip_Vector_Value } from '../models/equip_vector_value.models.js';
import { Operational_Streets_Values } from '../models/operational_streets_values.models.js';

export const vectorGet = async (req = request, res = response) => {
  const vectors = await Vector.findAll({
    include: [
      { model: User, attributes: ['user_name'] },
      { model: Area, attributes: ['name'] },
      { model: SubArea, attributes: ['name'] },
      { model: Activity, attributes: ['name'] },
      { model: Criteria, attributes: ['name'] },
      {
        model: ValueVector,
        attributes: ['id', 'position', 'value', 'period'],
      },
    ],
    attributes: {
      exclude: ['user_id'],
    },
  });
  if (vectors.length !== 0) {
    const { newVectorFormArray } = vectorForm(vectors, {});
    res.status(200).json(newVectorFormArray);
  } else {
    res.status(200).json({
      msg: 'no data in DB',
    });
  }
};
export const vectorGetById = async (req = request, res = response) => {
  const { id } = req.params;
  const vector = await Vector.findByPk(id, {
    include: [
      { model: User, attributes: ['user_name'] },
      { model: Area, attributes: ['name'] },
      { model: SubArea, attributes: ['name'] },
      { model: Activity, attributes: ['name'] },
      { model: Criteria, attributes: ['name'] },
      {
        model: ValueVector,
        attributes: ['id', 'position', 'value'],
      },
    ],
    attributes: {
      exclude: [
        'user_id',
        'area_id',
        'sub_area_id',
        'activity_id',
        'criteria_id',
      ],
    },
  });
  const { newVectorFormObj } = vectorForm([], vector);
  if (vector.length !== 0) {
    res.status(200).json(newVectorFormObj);
  } else {
    res.status(200).json({
      msg: 'no data in DB',
    });
  }
};
export const vectorPost = async (req = request, res = response) => {
  const {
    user_id,
    area_id,
    sub_area_id,
    activity_id,
    criteria_id,
    availability,
    power_input,
    air_velocity,
    area_m2,
    fix_q,
    intake_t,
    output_t,
    k_w,
    r_h,
    volume_m3,
    vector,
    position,
    type_vector,
  } = req.body;
  const newVector = {
    user_id: user_id,
    area_id: area_id,
    sub_area_id: sub_area_id,
    activity_id: activity_id,
    criteria_id: criteria_id,
    availability: availability,
    air_velocity: air_velocity || 0,
    area_m2: area_m2 || 0,
    fix_q: fix_q || 0,
    intake_t: intake_t || 0,
    output_t: output_t || 0,
    k_w: k_w || 0,
    r_h: r_h || 0,
    volume_m3: volume_m3 || 0,
    vector: vector,
    power_input: power_input,
    type_vector: type_vector,
    position: position,
  };
  const addVector = Vector.build(newVector);
  await addVector.save();
  res.status(201).json({
    msg: 'vector created correctly',
    id: addVector.id,
  });
};
export const operational_street_post = async (
  req = request,
  res = response,
) => {
  const { criteria_id, area_m2_2, air_velocity_2, fix_q_2, power_input_2 } =
    req.body;
  const vector_id = req.params.vector_id;
  const addOP = {
    vector_id: vector_id,
    criteria_id: criteria_id,
    power_input_2: power_input_2,
    air_velocity_2: air_velocity_2,
    area_m2_2: area_m2_2,
    fix_q_2: fix_q_2,
  };
  const addedOP = Operational_Streets.build(addOP);
  await addedOP.save();
  res.status(201).json({ msg: 'operational street created correctly' });
};

export const equip_vector_value_post = async (
  req = request,
  res = response,
) => {
  const { vector_id, value_y, value_x } = req.body;
  const addEVV = {
    vector_id: vector_id,
    value_y: value_y,
    value_x: value_x,
  };
  const addedEVV = Equip_Vector_Value.build(addEVV);
  await addedEVV.save();
  res.status(201).json({ msg: 'equip vector value created correctly' });
};

export const operational_street_value_post = async (
  req = request,
  res = response,
) => {
  const { vector_id, value_y, value_x } = req.body;
  const addOSV = {
    vector_id: vector_id,
    value_y: value_y,
    value_x: value_x,
  };
  const addedOSV = Operational_Streets_Values.build(addOSV);
  await addedOSV.save();
  res.status(201).json({ msg: 'operational street value created correctly' });
};
export const vectorPut = async (req = request, res = response) => {
  const uuid = req.params.id;
  const { id, vector, ...resto } = req.body;
  console.log(resto);
  const upVector = await Vector.findByPk(uuid);
  const { vector: oldName } = upVector;
  if (vector !== oldName) {
    resto.vector = vector;
  }
  await upVector.update(resto);
  res.status(200).json({ msg: 'update vector' });
};
export const vectorDelete = async (req = request, res = response) => {
  const uuid = req.params.id;
  const deleteVector = await Vector.findByPk(uuid);
  await deleteVector.destroy({
    where: { id: uuid },
    cascade: true,
    include: [
      ValueVector,
      Operational_Streets,
      Operational_Streets_Values,
      Equip_Vector_Value,
    ],
  });
  res.status(200).json({ msg: 'vector deleted' });
};
