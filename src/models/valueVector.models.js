import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';

export const ValueVector = db.define(
  'valuevector',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: { type: DataTypes.UUID },
    vector_id: {
      type: DataTypes.UUID,
    },
    position: { type: DataTypes.INTEGER },
    value: { type: DataTypes.INTEGER },
    period: { type: DataTypes.INTEGER },
  },
  {
    tableName: 'Valuevector',
    timestamps: false,
  },
);
