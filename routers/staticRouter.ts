import { Router } from 'express';
import path from 'path';

export const staticRouter = Router();

staticRouter.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'static/index.html'));
});
