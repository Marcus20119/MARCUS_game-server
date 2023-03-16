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
  '/users',
  checkToken,
  checkAdmin,
  getController.getAllDataFromUsers
);

export default getRouter;
