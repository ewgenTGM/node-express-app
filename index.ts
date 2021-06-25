import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
//@ts-ignore
import Logger from 'simple-node-logger';
import userRouter from './routers/user-router';
import config from 'config';
import mongoose from 'mongoose';
import defaultRouter from './routers/default-router';
import {authRouter} from './routers/authRouter';

const log_options = {
  logFilePath: 'mylogfile.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss'
};

const logger = Logger.createSimpleLogger(log_options);
const app: Express = express();

const PORT = process.env.PORT || config.get('PORT');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use(defaultRouter);

async function start() {
  const DB_URL: string = config.get('DB_URL');
  try {
    await mongoose.connect(DB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    });
    logger.info('MongoDB is connected');
    app.listen(PORT, () => {
      logger.info(`Application started on port ${PORT}`);
    });
  } catch (e) {
    logger.error(e.message);
  }
}

start();