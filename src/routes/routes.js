import authRouter from './authRouter';
// import exampleRouter from './exampleRouter';
// import crudRouter from './crudRouter';

const initWebRoutes = app => {
  app.use('/auth', authRouter);
};

export default initWebRoutes;
