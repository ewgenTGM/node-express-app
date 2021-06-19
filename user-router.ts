import {Router} from 'express';
import {v1} from 'uuid';
import {UserType} from './models/userModel';

const userRouter = Router();

userRouter.get('/:id', (req, res) => {
  const id = req.params['id'];
  console.log(id);
  res.status(200);
  const user: UserType = {
    id,
    name: 'Eugene',
    age: 25,
    email: 'user@mail.com'
  };
  res.send(user);
});

userRouter.post('/', (req, res) => {
  const {name, age, email} = req.body;
  const user: UserType = {id: v1(), name, age, email};
  res.status(201).send(user);
});

userRouter.delete('/:id', (req, res) => {
  const id = req.params['id'];
  if (Math.random() > 0.5) {
    res.status(404).send({message: `User ${id} not found`});
  } else {
    res.status(202).send({message: `User ${id} deleted`});
  }
});

userRouter.put('/:id', (req, res) => {
    const {name, age, email} = req.body;
    const id = req.params['id'];
    res.status(202).send({id, name, age, email});
  }
);

export default userRouter;