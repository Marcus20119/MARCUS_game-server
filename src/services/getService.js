import db from '../models';

/**
 *
 * @param {'User' | 'Wordle'} modelName
 * @returns
 */
async function getAllData(modelName, query) {
  const offset = query?.page ? (query.page - 1) * 10 : 0;
  const limit = 10;
  return new Promise(async (resolve, reject) => {
    try {
      if (!modelName) {
        reject('missing modelName');
      }
      const data = await db[modelName].findAll({
        offset,
        limit,
        order: [
          [
            query?.orderField ? query.orderField : 'id',
            query?.orderType ? query.orderType : 'DESC',
          ],
        ],
        raw: true,
      });
      const countRow = await db[modelName].count();
      resolve({
        status: 200,
        payload: {
          message: `Get page ${
            query?.page ? query.page : 1
          } data from ${modelName} successfully`,
          data,
          totalPages: Math.floor(countRow / 10 + 1),
        },
      });
    } catch (err) {
      reject(err);
    }
  });
}

/**
 *
 * @param {'User' | 'Wordle'} modelName
 * @param {number} id
 * @returns
 */
async function getDataByUserId(modelName, userId) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!modelName) {
        reject('missing modelName');
      }
      const data = await db[modelName].findOne({ where: { userId } });
      resolve({
        status: 200,
        payload: {
          message: `Get data successfully`,
          data,
        },
      });
    } catch (err) {
      reject(err);
    }
  });
}

export { getAllData, getDataByUserId };
