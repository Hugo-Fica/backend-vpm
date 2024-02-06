import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';
import { Vector } from './vector.models.js';

export const Area = db.define(
  'area',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING },
  },
  {
    tableName: 'Area',
    timestamps: false,
  },
);
Area.hasMany(Vector, {
  foreignKey: 'area_id',
  sourceKey: 'id',
});
Vector.belongsTo(Area, {
  foreignKey: 'area_id',
  targetKey: 'id',
});
