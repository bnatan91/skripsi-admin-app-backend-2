import { Sequelize } from 'sequelize';
import dbConfig from '../config/config.js';

const Db = new Sequelize(dbConfig);

export default Db;
