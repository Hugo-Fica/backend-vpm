import { DataTypes } from 'sequelize';
import db from '../database/config.db.js';
import { User } from './user.models.js';

export const Role = db.define(
  'role',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role: { type: DataTypes.STRING },
  },
  { tableName: 'Role', timestamps: false },
);
Role.hasMany(User, {
  foreignKey: 'role_id',
  sourceKey: 'id',
});
User.belongsTo(Role, {
  foreignKey: 'role_id',
  targetKey: 'id',
});
