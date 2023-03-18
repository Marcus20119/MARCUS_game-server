import express from 'express';
import postController from '../controllers/postController';
import { checkPlayer, checkToken } from '../middlewares';

const postRouter = express.Router();

postRouter.post(
  '/save-wordle-result',
  checkToken,
  checkPlayer,
  postController.handleSaveWordleResult
);
postRouter.post(
  '/save-tictactoe-result',
  checkToken,
  checkPlayer,
  postController.handleSaveTictactoeResult
);

export default postRouter;
