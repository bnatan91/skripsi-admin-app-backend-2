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
import serveFavicon from 'serve-favicon';
dotenv.config();

const app = express();

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

app.use(serveFavicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(Api);
app.use(SubjectSRoutes);
app.use(UsersRoutes);
app.use(AuthRoutes);

// store.sync()

app.listen(process.env.APP_PORT, () => {
  console.log('server is running');
});
