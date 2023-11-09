import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  HOST: 'roundhouse.proxy.rlwy.net',
  USER: 'root',
  PASSWORD: '3CF65E5fbF3bCACCFDfc355b3D2FdAdC',
  DB: 'railway',
  DIALECT: 'mysql',
  PORT: 30234,
};

export default dbConfig;
