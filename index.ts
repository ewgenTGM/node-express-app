import express from 'express';
import cors from 'cors';
import userRouter from './routers/userRouter';
import config from 'config';
import defaultRouter from './routers/defaultRouter';
import { authRouter } from './routers/authRouter';
import cookieParser from 'cookie-parser';
import logger from './logger';
import useLogger from './middlewares/useLogger';
import useAuth from './middlewares/useAuth';
import { connectDb } from './connectMongoDb';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { configireIO } from './configureIO';
import { staticRouter } from './routers/staticRouter';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
configireIO(io);

const PORT = process.env.PORT || config.get('PORT');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));

app.get('/', staticRouter);

app.use('/user', useAuth, userRouter);
app.use('/auth', useLogger, authRouter);
app.use(defaultRouter);

async function start() {
	const DB_URL: string = config.get('DB_URL');
	try {
		await connectDb(DB_URL);
		logger.info('MongoDB is connected');
		httpServer.listen(PORT, () => {
			logger.info(`Application started on port ${PORT}`);
		});
	} catch (e) {
		logger.error(e.message);
	}
}

start();
