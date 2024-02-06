import bcryptjs from 'bcryptjs';
import { response, request } from 'express';
import { User } from '../models/user.models.js';
import { Role } from '../models/roles.models.js';
import { transformedDatas } from '../helpers/transformData.js';

export const userGet = async (req = request, res = response) => {
  const user = await User.findAll({
    where: { state: true },
    include: [{ model: Role, attributes: ['role'] }],
    attributes: { exclude: ['role_id', 'pass'] },
    raw: true,
  });
  const { transformedDataArray } = transformedDatas(user);
  if (user.length !== 0) {
    res.status(200).json(transformedDataArray);
  } else {
    res.status(200).json({
      msg: 'no data in DB',
    });
  }
};
export const userGetAll = async (req = request, res = response) => {
  const user = await User.findAll({
    include: [{ model: Role, attributes: ['role'] }],
    attributes: { exclude: ['role_id', 'pass'] },
    raw: true,
  });
  const { transformedDataArray } = transformedDatas(user);
  if (user.length !== 0) {
    res.status(200).json(transformedDataArray);
  } else {
    res.status(200).json({
      msg: 'no data in DB',
    });
  }
};
export const userGetById = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await User.findByPk(id, {
    include: [{ model: Role, attributes: ['role'] }],
    attributes: { exclude: ['role_id', 'pass'] },
    raw: true,
  });
  const { transformedData } = transformedDatas([], user);
  if (user) {
    res.status(200).json(transformedData);
  } else {
    res.status(200).json({
      msg: 'user not found in DB',
    });
  }
};
export const userPost = async (req = request, res = response) => {
  const { role_id, fname, lname, email, pass, user_name } = req.body;
  const user = {
    role_id: role_id,
    fname: fname,
    lname: lname,
    user_name: user_name,
    email: email,
    pass: pass,
  };
  const newUser = User.build(user);
  const salt = bcryptjs.genSaltSync();
  newUser.pass = bcryptjs.hashSync(pass, salt);
  await newUser.save();
  res.status(201).json({ msg: 'user created correctly' });
};
export const userPut = async (req = request, res = response) => {
  const userId = req.params.id;
  const { id, ...resto } = req.body;
  const upUser = await User.findByPk(userId);
  await upUser.update(resto);
  res.status(200).json({
    msg: 'update user',
  });
};
export const userDelete = async (req = request, res = response) => {
  const userId = req.params.id;
  const userExists = await User.findByPk(userId);
  await userExists.update({ state: false });
  res.status(200).json({
    msg: 'user deleted',
  });
};
