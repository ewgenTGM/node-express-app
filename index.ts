import express, { Express, Request, Response } from 'express';

const app: Express = express();

const PORT = process.env.PORT || 3000;

type UserType = {
  name: string
  age: number
  email: string
}

const user: UserType = {
  name: 'Eugeni',
  age: 35,
  email: 'ewgenbi@gmail.com'
};

app.get( '/napp', ( req: Request, res: Response ) => {
  if ( req.query.api_key !== '123' ) {
    res.statusCode = 403;
    res.send();
  }
  const api_key = 'Api_key: ' + req.query.api_key + '\n',
      page = 'Page: ' + req.query.page + '\n',
      ip = 'Your ip is: ' + req.ip + '\n',
      response = [ api_key, page, ip ].join( '<br/>' );
  res.send( response );
} );

app.listen( PORT, () => {
  console.log( `Application running on port ${ PORT }` );
} );