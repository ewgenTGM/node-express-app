import mongoose from 'mongoose';
import logger from './logger';

export async function connectDb(url: string) {
	try {
		await mongoose.connect(url, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useFindAndModify: true,
			useUnifiedTopology: true,
		});
	} catch (error) {
		logger.error(error.message);
	}
}
