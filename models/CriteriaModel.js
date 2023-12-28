import { Sequelize } from 'sequelize';
import Db from './index.js';

const Criteria = Db.define('criteria', {
  uuid: {
    type: Sequelize.STRING,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  criteriaName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  criteriaValue: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

export default Criteria;
