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

let corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (corsWhiteList.indexOf(origin) === -1) {
      var msg =
        'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
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

app.use(cors(corsOptions));
app.options('*', cors());
app.use(express.json());

app.use(Api);
app.use(SubjectSRoutes);
app.use(UsersRoutes);
app.use(AuthRoutes);

// store.sync()

app.listen(process.env.APP_PORT, () => {
  console.log('server is running');
});
