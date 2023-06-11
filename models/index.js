import { Sequelize } from 'sequelize';
import dbConfig from '../config/config.js';

const Db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  port: dbConfig.PORT,
});

export default Db;
