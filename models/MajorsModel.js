import { Sequelize } from 'sequelize';
import Db from './index.js';
import Students from './StudentsModel.js';
import Users from './UsersModel.js';

const Majors = Db.define(
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
    label: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
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
        len: [3, 100],
      },
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    extra_note: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    studentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
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
  {
    freezeTableName: true,
  },
);

Students.hasMany(Majors);
Majors.belongsTo(Students, { foreignKey: 'studentId' });

Users.hasMany(Majors);
Majors.belongsTo(Users, { foreignKey: 'userId' });

export default Majors;
