import { response, request } from 'express';
import { SubArea } from '../models/subArea.models.js';

export const subAreaGet = async (req = request, res = response) => {
  const subarea = await SubArea.findAll();
  if (subarea.length !== 0) {
    res.status(200).json(subarea);
  } else {
    res.status(404).json({
      msg: 'no data in DB',
    });
  }
};
export const subAreaPost = async (req = request, res = response) => {
  const { sub_area } = req.body;
  const newsubarea = {
    name: sub_area,
  };
  const addSubarea = SubArea.build(newsubarea);
  await addSubarea.save();
  res.status(201).json({
    msg: 'subarea created correctly',
  });
};
export const subAreaPut = async (req = request, res = response) => {
  const uid = req.params.id;
  const { id, ...resto } = req.body;
  const upSubarea = await SubArea.findByPk(uid);
  await upSubarea.update(resto);
  res.json({
    msg: 'update subarea',
  });
};
export const subAreaDelete = async (req = request, res = response) => {
  const uid = req.params.id;
  const deleteSubarea = await SubArea.findByPk(uid);
  await deleteSubarea.destroy({ where: { id: uid } });
  res.status(200).json({
    msg: 'delete subarea',
  });
};
