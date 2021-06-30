import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './routers/userRouter';
import config from 'config';
import mongoose from 'mongoose';
import defaultRouter from './routers/defaultRouter';
import { authRouter } from './routers/authRouter';
import cookieParser from 'cookie-parser';
import logger from './logger';
import useLogger from './middlewares/useLogger';
import useAuth from './middlewares/useAuth';

const app: Express = express();

const PORT = process.env.PORT || config.get('PORT');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/user', useAuth, userRouter);
app.use('/auth', useLogger, authRouter);
app.use(defaultRouter);

async function start() {
	const DB_URL: string = config.get('DB_URL');
	try {
		await mongoose.connect(DB_URL, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useFindAndModify: true,
			useUnifiedTopology: true,
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
