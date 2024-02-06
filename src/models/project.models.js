import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';
import { Scenario } from './scenario.models.js';

export const Project = db.define(
  'project',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    area_id: { type: DataTypes.UUID },
    sub_area_id: { type: DataTypes.UUID },
    airways_id: { type: DataTypes.UUID },
    activity_id: { type: DataTypes.UUID },
    criteria_id: { type: DataTypes.UUID },
    user_id: { type: DataTypes.UUID },
    project: { type: DataTypes.STRING },
  },
  {
    tableName: 'Project',
    timestamps: false,
  },
);
Project.hasMany(Scenario, {
  foreignKey: 'project_id',
  sourceKey: 'id',
});
Scenario.belongsTo(Project, {
  foreignKey: 'project_id',
  targetKey: 'id',
});
