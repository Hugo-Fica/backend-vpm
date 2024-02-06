import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';
import { Vector } from './vector.models.js';

export const Equip_Vector_Value = db.define(
  'equip_vector_value',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    vector_id: { type: DataTypes.UUID },
    value_y: { type: DataTypes.FLOAT },
    value_x: { type: DataTypes.FLOAT },
  },
  {
    tableName: 'Equip_Vector_Value',
    timestamps: false,
  },
);

Equip_Vector_Value.hasMany(Vector, {
  foreignKey: 'id',
  sourceKey: 'vector_id',
});
Vector.belongsTo(Equip_Vector_Value, {
  foreignKey: 'id',
  targetKey: 'vector_id',
});
