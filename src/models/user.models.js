import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';
import { Project } from './project.models.js';
import { Vector } from './vector.models.js';
import { Scenario } from './scenario.models.js';
import { ValueVector } from './valueVector.models.js';

export const User = db.define(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role_id: { type: DataTypes.UUID },
    fname: { type: DataTypes.STRING },
    lname: { type: DataTypes.STRING },
    user_name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    pass: { type: DataTypes.STRING },
    state: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    tableName: 'User',
    timestamps: false,
  },
);
User.hasMany(Project, {
  foreignKey: 'user_id',
  sourceKey: 'id',
});
Project.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
});
User.hasMany(Vector, {
  foreignKey: 'user_id',
  sourceKey: 'id',
});
Vector.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
});
User.hasMany(Scenario, {
  foreignKey: 'user_id',
  sourceKey: 'id',
});
Scenario.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
});
User.hasMany(ValueVector, {
  foreignKey: 'user_id',
  sourceKey: 'id',
});
ValueVector.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
});
