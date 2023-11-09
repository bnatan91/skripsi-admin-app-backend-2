import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  DIALECT: 'mysql',
  PORT: process.env.PORT,
};

export default dbConfig;
