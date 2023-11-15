import express from 'express';
import session from 'express-session';
import cors from 'cors';
import SequelizeStore from 'connect-session-sequelize';
import SubjectSRoutes from './routes/SubjectRoutes.js';
import UsersRoutes from './routes/UsersRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js';
import StudentsRoutes from './routes/StudentsRoutes.js';
import MajorsRoutes from './routes/MajorsRoutes.js';
import Api from './routes/api.js';
import dotenv from 'dotenv';
import Db from './models/index.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: Db,
});

(async () => {
  await Db.sync();
})();

const oneDay = 1000 * 60 * 60 * 24;

let sessionOptions = {
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    domain: process.env.DOMAIN,
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: oneDay,
  },
};

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(session(sessionOptions));

app.use(
  cors({
    origin: [process.env.FRONTEND, process.env.API_URL],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }),
);

app.use(Api);
app.use(SubjectSRoutes);
app.use(StudentsRoutes);
app.use(MajorsRoutes);
app.use(UsersRoutes);
app.use(AuthRoutes);

// store.sync()

app.listen(process.env.APP_PORT, () => {});
