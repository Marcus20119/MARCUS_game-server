import authRouter from './authRouter';
import getRouter from './getRouter';
import postRouter from './postRouter';
import updateRouter from './updateRouter';

const initWebRoutes = app => {
  app.use('/auth', authRouter);
  app.use('/g', getRouter);
  app.use('/p', postRouter);
  app.use('/u', updateRouter);
};

export default initWebRoutes;
