import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';
import { Vector } from './vector.models.js';

export const Criteria = db.define(
  'criteria',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    value: { type: DataTypes.INTEGER },
    type_vector: { type: DataTypes.INTEGER },
    other_vector: { type: DataTypes.INTEGER },
  },
  { tableName: 'Criteria', timestamps: false },
);
Criteria.hasMany(Vector, {
  foreignKey: 'criteria_id',
  sourceKey: 'id',
});
Vector.belongsTo(Criteria, {
  foreignKey: 'criteria_id',
  targetKey: 'id',
});
