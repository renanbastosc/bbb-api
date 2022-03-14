import { Router } from 'express';

import EliminationController from './app/controllers/EliminationController';
import HouseGuestController from './app/controllers/HouseGuestController';
import UserController from './app/controllers/UserController';
import VoteController from './app/controllers/VoteController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';
import providerMiddleware from './app/middlewares/provider';

const routes = new Router();

routes.post('/users', UserController.save);

routes.get('/elimination', EliminationController.public_show);

routes.get('/house-guests', HouseGuestController.index);
routes.get('/house-guests', HouseGuestController.show);

routes.get('/votes', VoteController.index);

routes.post('/sessions', SessionController.save);

routes.use(authMiddleware);

routes.post('/votes', VoteController.save);
routes.get('/users/:id', UserController.show);

routes.use(providerMiddleware);

routes.post('/house-guests', HouseGuestController.save);
routes.get('/eliminations', EliminationController.index);
routes.get('/eliminations/:id', EliminationController.show);
routes.post('/eliminations', EliminationController.save);
routes.put('/eliminations/close', EliminationController.close);


routes.get('/users', UserController.index);

export default routes;
