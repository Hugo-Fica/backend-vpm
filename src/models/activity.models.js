import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';
import { Vector } from './vector.models.js';

export const Activity = db.define(
  'activity',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING },
  },
  {
    tableName: 'Activity',
    timestamps: false,
  },
);
Activity.hasMany(Vector, {
  foreignKey: 'activity_id',
  sourceKey: 'id',
});
Vector.belongsTo(Activity, {
  foreignKey: 'activity_id',
  targetKey: 'id',
});
