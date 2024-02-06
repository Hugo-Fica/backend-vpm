import { response, request } from 'express';
import { Activity } from '../models/activity.models.js';

export const activityGet = async (req = request, res = response) => {
  const activitys = await Activity.findAll();
  if (activitys.length !== 0) {
    res.status(200).json(activitys);
  } else {
    res.status(404).json({
      msg: 'no data in DB',
    });
  }
};
export const activityPost = async (req = request, res = response) => {
  const { activity } = req.body;
  const newActivity = {
    name: activity,
  };
  const addActivity = Activity.build(newActivity);
  await addActivity.save();
  res.status(201).json({
    msg: 'activity created correctly',
  });
};
export const activityPut = async (req = request, res = response) => {
  const uid = req.params.id;
  const { id, ...resto } = req.body;
  const upActivity = await Activity.findByPk(uid);
  await upActivity.update(resto);
  res.json({
    msg: 'update activity',
  });
};
export const activityDelete = async (req = request, res = response) => {
  const uid = req.params.id;
  const deleteActivity = await Activity.findByPk(uid);
  await deleteActivity.destroy({ where: { id: uid } });
  res.status(200).json({
    msg: 'delete activity',
  });
};
