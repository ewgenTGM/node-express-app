import express, { Express, Request, Response } from 'express';

const app: Express = express();

const PORT = process.env.PORT || 3000;

type UserType = {
  name: string
  age: number
  email: string
}

const user1: UserType = {
  name: 'Eugeni',
  age: 35,
  email: 'ewgenbi@gmail.com'
};

app.get( '/route', ( req: Request, res: Response ) => {
  res.json( user1 );
} );

app.listen( PORT );