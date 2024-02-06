import { request, response } from 'express';
import { Role } from '../models/roles.models.js';

export const rolesGet = async (req = request, res = response) => {
  const role = await Role.findAll();
  if (role.length !== 0) {
    res.status(200).json(role);
  } else {
    res.status(200).json({
      msg: 'no data in DB',
    });
  }
};
export const rolePost = async (req = request, res = response) => {
  const { role } = req.body;
  await Role.create({ role });
  res.status(201).json({ msg: 'role created correctly' });
};

export const rolePut = async (req = request, res = response) => {
  const { id } = req.params;
  const { role } = req.body;
  const upRole = await Role.findByPk(id);
  await upRole.update({ role });
  res.status(200).json({
    msg: 'updated role',
  });
};

export const roleDelete = async (req = request, res = response) => {
  const { id } = req.params;
  await Role.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).json({
    msg: 'deleted role',
  });
};
