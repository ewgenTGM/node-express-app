import {Router} from 'express';
import {UserType} from './models/userModel';
import {ResponseModel} from './models/ResponseModel';
import {FakeUserRepositoryClass, IUserRepository} from './DAL/FakeUserRepositoryClass';

const userRouter = Router();

const repository: IUserRepository = new FakeUserRepositoryClass();

userRouter.get('/', (req, res) => {
  const response = new ResponseModel<Array<UserType>>();
  try {
    response.data = repository.getAllUsers();
  } catch (e) {
    response.errors.push(e.message);
    response.success = false;
  } finally {
    res.json(response);
  }
});

userRouter.get('/:id', (req, res) => {
  const response = new ResponseModel<UserType>();
  try {
    const {id} = req.params;
    if (id.trim() === '') {
      response.errors.push('Bad parameter "id"');
    } else {
      const user = repository.getUserById(id);
      if (user) {
        response.data = user;
      } else {
        response.success = false;
        response.errors.push(`User with id ${id} not found`);
      }
    }
  } catch (e) {
    response.errors.push(e.message);
    response.success = false;
  } finally {
    res.json(response);
  }
});

userRouter.post('/', (req, res) => {
  const response = new ResponseModel<UserType>();
  try {
    const {name, age, email} = req.body;
    const user = repository.addUser({name, age, email});
    response.data = user;
  } catch (e) {
    response.success = false;
    response.errors.push(e.message);
  } finally {
    res.json(response);
  }

});

userRouter.delete('/:id', (req, res) => {
  const response = new ResponseModel<string>();
  try {
    const {id} = req.params;
    if (repository.deleteUser(id)) {
      response.data = `User ${id} deleted`;
    } else {
      response.data = `User ${id} not found`;
      response.success = false;
    }
  } catch (e) {
    response.success = false;
    response.errors.push(e.message);
  } finally {
    res.json(response);
  }
})
;

userRouter.patch('/:id', (req, res) => {
    const response = new ResponseModel<UserType>();
    try {
      const {name, age, email} = req.body;
      const {id} = req.params;
      const user = repository.updateUser(id, {name, age, email});
      if (user) {
        response.data = user;
      } else {
        response.success = false;
        response.errors.push(`User ${id} not found`);
      }

    } catch (e) {
      response.success = false;
      response.errors.push(e.message);
    } finally {
      res.json(response);
    }
  }
);

export default userRouter;