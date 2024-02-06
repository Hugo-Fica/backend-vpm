import { response, request } from 'express';
import { Area } from '../models/area.models.js';

export const areaGet = async (req = request, res = response) => {
  const area = await Area.findAll();
  if (area.length !== 0) {
    res.status(200).json(area);
  } else {
    res.status(200).json({
      msg: 'no data in DB',
    });
  }
};
export const areaPost = async (req = request, res = response) => {
  const { area } = req.body;
  const newArea = {
    name: area,
  };
  const addArea = Area.build(newArea);
  await addArea.save();
  res.status(201).json({
    msg: 'area created correctly',
  });
};
export const areaPut = async (req = request, res = response) => {
  const uid = req.params.id;
  const { id, ...resto } = req.body;
  const upArea = await Area.findByPk(uid);
  await upArea.update(resto);
  res.json({
    msg: 'update area',
  });
};
export const areaDelete = async (req = request, res = response) => {
  const uid = req.params.id;
  const deleteArea = await Area.findByPk(uid);
  await deleteArea.destroy({ where: { id: uid } });
  res.status(200).json({
    msg: 'delete area',
  });
};
