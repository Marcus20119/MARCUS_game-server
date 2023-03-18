import express from 'express';
import getController from '../controllers/getController';
import { checkAdmin, checkPlayer, checkToken } from '../middlewares';

const getRouter = express.Router();

getRouter.get(
  '/wordle/:userId',
  checkToken,
  checkPlayer,
  getController.getWordleByUserId
);
getRouter.get(
  '/wordle',
  checkToken,
  checkPlayer,
  getController.getAllDataFromWordle
);
getRouter.get(
  '/tictactoe/:userId',
  checkToken,
  checkPlayer,
  getController.getTictactoeByUserId
);
getRouter.get(
  '/users/:type',
  checkToken,
  checkAdmin,
  getController.getAllDataFromUsers
);
getRouter.get(
  '/user/:userId',
  checkToken,
  checkAdmin,
  getController.getUserByUserId
);

export default getRouter;
