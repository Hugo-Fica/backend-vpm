import { response, request } from 'express';
import { Setting } from '../models/setting.models.js';

export const settingGet = async (req = request, res = response) => {
  const { id } = req.params;
  const setting = await Setting.findByPk(id);
  res.status(200).json(setting);
};
export const settingPost = async (req = request, res = response) => {
  const { unit, leakage, value_leakage, period } = req.body;
  const newSetting = {
    unit: unit,
    leakage: leakage,
    value_leakage: value_leakage,
    period: period,
  };
  const addSetting = Setting.build(newSetting);
  await addSetting.save();
  res.status(200).json({ msg: 'created setting' });
};
export const settingPut = async (req = request, res = response) => {
  const uid = req.params.id;
  const { id, ...resto } = req.body;
  const upSetting = await Setting.findByPk(uid);
  await upSetting.update(resto);
  res.json({
    msg: 'updated settings',
  });
};
