import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';

export const Period = db.define(
  'period',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    scenario_id: { type: DataTypes.UUID },
    period: { type: DataTypes.INTEGER },
  },
  { tableName: 'Period', timestamps: false },
);
