import db from '../models';

async function handleTest(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.User.findAll();
      resolve({
        status: 200,
        payload: {
          message: 'Get successfully',
          data,
        },
      });
    } catch (err) {
      reject(err);
    }
  });
}

export { handleTest };
