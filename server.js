import express from 'express';
import cors from 'cors';
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import SubjectRoutes from './routes/SubjectRoutes.js';
import MajorRoutes from './routes/MajorRoutes.js';
import UsersRoutes from './routes/UsersRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js';
import Api from './routes/api.js';
import dotenv from 'dotenv';
import Db from './models/index.js';
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const corsWhiteList = [' ', 'http://localhost:3000', 'http://localhost:3001'];

const store = new sessionStore({
  db: Db,
});

(async () => {
  console.log('test');
  await Db.sync();
})();

let corsOptions = {
  credentials: true, //access-control-allow-credentials:true
  origin: [
    'Access-Control-Allow-Origin',
    (origin, callBack) => {
      if (corsWhiteList.indexOf(origin) !== -1) {
        callBack(null, true);
      } else {
        callBack(new Error('Not allowed by CORS'));
      }
    },
  ],
};

let sessionOptions = {
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: 'auto',
  },
};

app.use(session(sessionOptions));

app.use(cors(corsOptions));

app.use(express.json());

app.use(Api);
app.use(SubjectRoutes);
app.use(MajorRoutes);
app.use(UsersRoutes);
app.use(AuthRoutes);

// store.sync()

app.listen(process.env.APP_PORT, () => {
  console.log('server is running');
});
