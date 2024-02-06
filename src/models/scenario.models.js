import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';
import { Period } from './period.models.js';

export const Scenario = db.define(
  'scenario',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    project_id: { type: DataTypes.UUID },
    vector_id: { type: DataTypes.UUID },
    user_id: { type: DataTypes.UUID },
    availability: { type: DataTypes.INTEGER },
    power_input: { type: DataTypes.INTEGER },
    air_velocity: { type: DataTypes.INTEGER },
    fix_q: { type: DataTypes.INTEGER },
    intake_t: { type: DataTypes.INTEGER },
    output_t: { type: DataTypes.INTEGER },
    kw: { type: DataTypes.INTEGER },
    rh: { type: DataTypes.INTEGER },
    volume_m3: { type: DataTypes.INTEGER },
  },
  { tableName: 'Scennario', timestamps: false },
);
Scenario.hasMany(Period, {
  foreignKey: 'scenario_id',
  sourceKey: 'id',
});
Period.belongsTo(Scenario, {
  foreignKey: 'scenario_id',
  targetKey: 'id',
});
