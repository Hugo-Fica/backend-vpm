import db from '../database/config.db.js';
import { DataTypes } from 'sequelize';
import { Vector } from './vector.models.js';
export const Operational_Streets = db.define(
  'operational_streets',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    vector_id: { type: DataTypes.UUID },
    criteria_id: { type: DataTypes.UUID },
    power_input_2: { type: DataTypes.FLOAT },
    air_velocity_2: { type: DataTypes.FLOAT },
    area_m2_2: { type: DataTypes.FLOAT },
    fix_q_2: { type: DataTypes.FLOAT },
  },
  {
    tableName: 'Operational_Streets',
    timestamps: false,
  },
);
Operational_Streets.hasMany(Vector, {
  foreignKey: 'id',
  sourceKey: 'vector_id',
});
Vector.belongsTo(Operational_Streets, {
  foreignKey: 'id',
  targetKey: 'vector_id',
});
