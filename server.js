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

const corsWhiteList = [
  'https://shark-app-wcnw9.ondigitalocean.app/',
  'http://localhost:3001',
];

const store = new sessionStore({
  db: Db,
});

(async () => {
  console.log('test');
  await Db.sync();
})();

const corsOptions = {
  origin: (origin, callback) => {
    if (corsWhiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error());
    }
  },
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

app.use(
  cors({
    origin: corsOptions,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  }),
);
app.options(corsWhiteList, cors());
app.use(express.json());

app.use(Api);
app.use(SubjectSRoutes);
app.use(UsersRoutes);
app.use(AuthRoutes);

// store.sync()

app.listen(process.env.APP_PORT, () => {
  console.log('server is running');
});
