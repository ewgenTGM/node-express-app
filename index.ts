import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
//@ts-ignore
import Logger from 'simple-node-logger';
import userRouter from './user-router';
import {UserType} from './models/userModel';
import {config} from 'dotenv';

config();
const log_options = {
  logFilePath: 'mylogfile.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss'
};

const log = Logger.createSimpleLogger(log_options);
const app: Express = express();

const PORT = process.env.PORT || 3000;

const user: UserType = {
  id: 'bfd',
  name: 'Eugeni',
  age: 35,
  email: 'ewgenbi@gmail.com'
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/user', userRouter);

// app.post( '/napp/:id', ( req, res ) => {
//   log.info( `Request from ${ req.ip }. Parameters: `, req.body, `, id: `, req.params.id );
//   res.json( req.body );
// } );
//
// app.get( '/napp', ( req: Request, res: Response ) => {
//   if ( req.query.api_key !== '123' ) {
//     res.statusCode = 403;
//     res.send();
//   }
//   const api_key = 'Api_key: ' + req.query.api_key + '\n',
//       page = 'Page: ' + req.query.page + '\n',
//       ip = 'Your ip is: ' + req.ip + '\n',
//       response = [ api_key, page, ip ].join( '<br/>' );
//   res.send( response );
// } );

app.listen(PORT, () => {
  log.info(`Application started on port ${PORT}`);
});