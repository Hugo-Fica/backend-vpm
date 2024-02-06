import { response, request } from 'express';
import { Project } from '../models/project.models.js';
import { User } from '../models/user.models.js';
import { Area } from '../models/area.models.js';
import { SubArea } from '../models/subArea.models.js';
import { Activity } from '../models/activity.models.js';
import { Criteria } from '../models/criteria.models.js';

export const projectGet = async (req = request, res = response) => {
  const project = await Project.findAll({
    include: [
      { model: Area, attributes: ['area'] },
      { model: User, attributes: ['user_name', 'email'] },
      { model: Activity, attributes: ['activity'] },
      { model: Criteria, attributes: ['criteria'] },
      { model: SubArea, attributes: ['sub_area'] },
    ],
    attributes: {
      exclude: [
        'area_id',
        'activity_id',
        'criteria_id',
        'sub_area_id',
        'user_id',
      ],
    },
  });
  if (project.length !== 0) {
    res.status(200).json(project);
  } else {
    res.status(404).json({
      msg: 'no data in DB',
    });
  }
};
export const projectPost = async (req = request, res = response) => {
  const {
    project,
    activity_id,
    airways_id,
    area_id,
    criteria_id,
    user_id,
    sub_area_id,
  } = req.body;
  const newProject = {
    project: project,
    sub_area_id: sub_area_id,
    activity_id: activity_id,
    airways_id: airways_id,
    area_id: area_id,
    criteria_id: criteria_id,
    user_id: user_id,
  };
  const addProject = Project.build(newProject);
  await addProject.save();
  res.status(201).json({
    msg: 'project created correctly',
  });
};
export const projectPut = async (req = request, res = response) => {
  const uid = req.params.id;
  const { id, ...resto } = req.body;
  const upProject = await Project.findByPk(uid);
  //   await upAirways.update(resto);
  res.status(200).json({
    msg: 'update airways',
    upProject,
  });
};
export const projectDelete = async (req = request, res = response) => {
  //   const uid = req.params.id;
  //   const deleteAirways = await Airways.findByPk(uid);
  //   await deleteAirways.destroy({ where: { id: uid } });
  //   res.status(200).json({
  //     msg: 'delete airways',
  //   });
};
