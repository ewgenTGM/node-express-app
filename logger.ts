//@ts-ignore
import Logger from 'simple-node-logger';

const log_options = {
	logFilePath: 'mylogfile.log',
	timestampFormat: 'YYYY-MM-DD HH:mm:ss',
};

const logger = Logger.createSimpleLogger(log_options);

export default logger;
