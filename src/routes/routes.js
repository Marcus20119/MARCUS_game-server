import authRouter from './authRouter';
import getRouter from './getRouter';

const initWebRoutes = app => {
  app.use('/auth', authRouter);
  app.use('/g', getRouter);
};

export default initWebRoutes;
