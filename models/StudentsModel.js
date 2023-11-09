import Users from './UsersModel.js';
import Db from './index.js';
import { Sequelize } from 'sequelize';

export const Students = Db.define(
  'student',
  {
    uuid: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    studentCode: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 50],
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true },
);

Users.hasMany(Students);
Students.belongsTo(Users, { foreignKey: 'userId' });

export default Students;
