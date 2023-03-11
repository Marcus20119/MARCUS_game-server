import authRouter from './authRouter';
import getRouter from './getRouter';
import postRouter from './postRouter';

const initWebRoutes = app => {
  app.use('/auth', authRouter);
  app.use('/g', getRouter);
  app.use('/p', postRouter);
};

export default initWebRoutes;
