import express from 'express';
import getController from '../controllers/getController';
import { checkPlayer, checkToken } from '../middlewares';

const getRouter = express.Router();

getRouter.get(
  '/wordle',
  checkToken,
  checkPlayer,
  getController.getAllDataFromWordle
);

getRouter.get(
  '/wordle/:userId',
  checkToken,
  checkPlayer,
  getController.getWordleByUserId
);

export default getRouter;
