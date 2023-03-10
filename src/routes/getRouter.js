import express from 'express';
import getController from '../controllers/getController';
import { checkToken } from '../middlewares';

const getRouter = express.Router();

getRouter.get('/test', checkToken, getController.handleTest);

export default getRouter;
