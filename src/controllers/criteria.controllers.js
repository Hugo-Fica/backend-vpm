import { response, request } from 'express';
import { Criteria } from '../models/criteria.models.js';

export const criteriaGet = async (req = request, res = response) => {
  const criteria = await Criteria.findAll();
  if (criteria.length !== 0) {
    res.status(200).json(criteria);
  } else {
    res.status(404).json({
      msg: 'no data in DB',
    });
  }
};
export const criteriaPost = async (req = request, res = response) => {
  const { criteria } = req.body;
  const newCriteria = {
    name: criteria,
  };
  const addCriteria = Criteria.build(newCriteria);
  await addCriteria.save();
  res.status(201).json({
    msg: 'criteria created correctly',
  });
};
export const criteriaPut = async (req = request, res = response) => {
  const uid = req.params.id;
  const { id, ...resto } = req.body;
  const upCriteria = await Criteria.findByPk(uid);
  await upCriteria.update(resto);
  res.json({
    msg: 'update criteria',
  });
};
export const criteriaDelete = async (req = request, res = response) => {
  const uid = req.params.id;
  const deleteCriteria = await Criteria.findByPk(uid);
  await deleteCriteria.destroy({ where: { id: uid } });
  res.status(200).json({
    msg: 'delete criteria',
  });
};
