import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

export default function useLogger(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const logEntry = {
			method: req.method,
			url: req.url,
			query: req.query,
			body: req.body,
			cookies: req.cookies,
		};
		logger.info(JSON.stringify(logEntry, null, 2));
	} catch (error) {}
	next();
}
