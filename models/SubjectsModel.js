import { Sequelize } from 'sequelize';
import Db from './index.js';
import Users from './UsersModel.js';

const Subjects = Db.define(
  'subject',
  {
    uuid: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    value: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    checkedT: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0.5,
    },
    checkedS: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0.5,
    },
    createdBy: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    updatedBy: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true },
);

export default Subjects;
