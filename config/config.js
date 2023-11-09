import dotenv, { config } from 'dotenv';
dotenv.config();

const databaseConnection = process.env.DATABASE;

export default databaseConnection;
