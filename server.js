import express from 'express';
import cors from 'cors';
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import SubjectSRoutes from './routes/SubjectRoutes.js';
import UsersRoutes from './routes/UsersRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js';
import Api from './routes/api.js';
import dotenv from 'dotenv';
import Db from './models/index.js';
import favicon from 'express-favicon';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(favicon(__dirname + '/public/favicon.png'));

const sessionStore = SequelizeStore(session.Store);

const corsWhiteList = ['http://localhost:3000', 'http://localhost:3001', '*'];

const store = new sessionStore({
  db: Db,
});

(async () => {
  console.log('test');
  await Db.sync();
})();

let corsOptions = {
  credentials: true, //access-control-allow-credentials:true
};

const oneDay = 1000 * 60 * 60 * 24;

let sessionOptions = {
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    maxAge: oneDay,
  },
};

app.use(session(sessionOptions));
app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.json());

app.use(Api);
app.use(SubjectSRoutes);
app.use(UsersRoutes);
app.use(AuthRoutes);

// store.sync()

app.listen(process.env.APP_PORT, () => {
  console.log('server is running');
});
