import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';
import { Vector } from './vector.models.js';

export const SubArea = db.define(
  'subarea',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING },
  },
  {
    tableName: 'Subarea',
    timestamps: false,
  },
);
SubArea.hasMany(Vector, {
  foreignKey: 'sub_area_id',
  sourceKey: 'id',
});
Vector.belongsTo(SubArea, {
  foreignKey: 'sub_area_id',
  targetKey: 'id',
});
