import db from '../models';

async function handleUpdateUser(clientData, userId) {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.update(clientData, {
        where: {
          id: userId,
        },
      });

      resolve({
        status: 200,
        payload: {
          message: 'Update user data successfully',
        },
      });
    } catch (err) {
      reject(err);
    }
  });
}

export { handleUpdateUser };
