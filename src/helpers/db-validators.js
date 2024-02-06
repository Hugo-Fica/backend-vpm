import { Op } from 'sequelize';
import { Activity } from '../models/activity.models.js';
import { Area } from '../models/area.models.js';
import { Criteria } from '../models/criteria.models.js';
import { Project } from '../models/project.models.js';
import { Role } from '../models/roles.models.js';
import { SubArea } from '../models/subArea.models.js';
import { User } from '../models/user.models.js';
import { ValueVector } from '../models/valueVector.models.js';
import { Vector } from '../models/vector.models.js';

export const validatorEmail = async (email = '') => {
  const thereEmail = await User.findOne({ where: { email: email } });
  if (thereEmail) {
    throw new Error(`this email: '${email}' already in use `);
  }
};

export const noUser = async (id = '') => {
  const findUser = await User.findOne({ where: { id: id } });
  if (!findUser) {
    throw new Error('this user does not exists');
  }
};
export const validatorUserName = async (user_name = '') => {
  const thereEmail = await User.findOne({ where: { user_name: user_name } });
  if (thereEmail) {
    throw new Error(`this user name: '${user_name}' already in use `);
  }
};
export const validatorRole = async (role_id = '', id = '') => {
  const existsRole = await Role.findOne({ where: { id: role_id || id } });
  if (!existsRole) {
    throw new Error(`this role: '${role_id}' not exists`);
  }
};
export const existsRole = async (role = '') => {
  const thereRole = await Role.findOne({ where: { role: role } });
  if (thereRole) {
    throw new Error(`this role: '${role}' already exists`);
  }
};
export const validatorArea = async (area = '') => {
  const existsArea = await Area.findOne({ where: { name: area } });
  if (existsArea) {
    throw new Error(`this area: '${area}' already exists`);
  }
};
export const noArea = async (id = '') => {
  const findArea = await Area.findOne({ where: { id: id } });
  if (!findArea) {
    throw new Error('this area does not exists');
  }
};
export const validatorSubArea = async (sub_area = '') => {
  const existsSubArea = await SubArea.findOne({
    where: { name: sub_area },
  });
  if (existsSubArea) {
    throw new Error(`this sub area: '${sub_area}' already exists`);
  }
};
export const noSubArea = async (id = '') => {
  const findSubArea = await SubArea.findOne({ where: { id: id } });
  if (!findSubArea) {
    throw new Error('this sub area does not exists');
  }
};
export const validatorActivity = async (activity = '') => {
  const existsActivity = await Activity.findOne({
    where: { name: activity },
  });
  if (existsActivity) {
    throw new Error(`this activity: '${activity}' already exists`);
  }
};
export const noActivity = async (id = '') => {
  const findActivity = await Activity.findOne({ where: { id: id } });
  if (!findActivity) {
    throw new Error('this activity does not exists');
  }
};

export const validatorCriteria = async (criteria = '') => {
  const existsCriteria = await Criteria.findOne({
    where: { name: criteria },
  });
  if (existsCriteria) {
    throw new Error(`this criteria: '${criteria}' already exists`);
  }
};
export const noCriteria = async (id = '') => {
  const findCriteria = await Criteria.findOne({ where: { id: id } });
  if (!findCriteria) {
    throw new Error('this criteria does not exists');
  }
};
export const validatorProject = async (project = '') => {
  const existsProject = await Project.findOne({
    where: { project: project },
  });
  if (existsProject) {
    throw new Error(`this project: '${project}' already exists`);
  }
};
export const noProject = async (id = '') => {
  const findProject = await Project.findOne({ where: { id: id } });
  if (!findProject) {
    throw new Error('this project does not exists');
  }
};
export const validatorVector = async (vector = '', { req }) => {
  const { id } = req.params;
  const existsVector = await Vector.findOne({
    where: {
      vector: vector,
      id: { [Op.ne]: id },
    },
  });
  if (existsVector) {
    throw new Error(`this vector: '${vector}' already exists`);
  }
};
export const noVector = async (id = '') => {
  const findVector = await Vector.findOne({ where: { id: id } });
  if (!findVector) {
    throw new Error('this vector does not exists');
  }
};
export const noValue = async (id = '') => {
  const findValue = await ValueVector.findByPk(id);
  if (!findValue) {
    throw new Error('this value does not exists');
  }
};
