import { Sequelize } from 'sequelize';
import Db from './index.js';
import Users from './UsersModel.js';

const Major = Db.define(
  'major',
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
        len: [3, 10],
      },
    },
  },
  { freezeTableName: true },
);

Users.hasMany(Major);
Major.belongsTo(Users, { foreignKey: 'userId' });

export default Major;
