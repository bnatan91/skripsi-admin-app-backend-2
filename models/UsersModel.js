import { Sequelize, DataTypes } from 'sequelize';
import Db from './index.js';

const Users = Db.define(
  'users',
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    roles: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true },
);

export default Users;
