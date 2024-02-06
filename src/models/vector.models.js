import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';
import { ValueVector } from './valueVector.models.js';

export const Vector = db.define(
  'vector',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: { type: DataTypes.UUID },
    area_id: { type: DataTypes.UUID },
    sub_area_id: { type: DataTypes.UUID },
    activity_id: { type: DataTypes.UUID },
    criteria_id: { type: DataTypes.UUID },
    vector: { type: DataTypes.STRING },
    availability: { type: DataTypes.FLOAT },
    power_input: { type: DataTypes.FLOAT },
    air_velocity: { type: DataTypes.FLOAT },
    area_m2: { type: DataTypes.FLOAT },
    fix_q: { type: DataTypes.FLOAT },
    intake_t: { type: DataTypes.FLOAT },
    output_t: { type: DataTypes.FLOAT },
    k_w: { type: DataTypes.FLOAT },
    r_h: { type: DataTypes.FLOAT },
    volume_m3: { type: DataTypes.FLOAT },
    type_vector: { type: DataTypes.INTEGER },
    position: { type: DataTypes.FLOAT },
  },
  {
    tableName: 'Vector',
    timestamps: false,
  },
);
Vector.hasMany(ValueVector, {
  foreignKey: 'vector_id',
  sourceKey: 'id',
});
ValueVector.belongsTo(Vector, {
  foreignKey: 'vector_id',
  targetKey: 'id',
});
