import db from '../models';

/**
 *
 * @param {'User' | 'Wordle' | 'Tictactoe'} modelName
 * @returns
 */
async function getAllData(modelName, query, type) {
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
        where: { isDeleted: type === 'deleted' ? 1 : 0 },
        order: [
          [
            query?.orderField ? query.orderField : 'id',
            query?.orderType ? query.orderType : 'DESC',
          ],
        ],
        raw: true,
      });
      const { count: countRow } = await db[modelName].findAndCountAll({
        where: { isDeleted: type === 'deleted' ? 1 : 0 },
      });
      resolve({
        status: 200,
        payload: {
          message: `Get page ${
            query?.page ? query.page : 1
          } data from ${modelName} successfully`,
          data,
          totalPages:
            countRow % limit === 0
              ? Math.floor(countRow / limit)
              : Math.floor(countRow / limit + 1),
        },
      });
    } catch (err) {
      reject(err);
    }
  });
}

/**
 *
 * @param {'User' | 'Wordle' | 'Tictactoe'} modelName
 * @param {number} id
 * @returns
 */
async function getDataByUserId(modelName, userId) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!modelName) {
        reject('missing modelName');
      }
      let data;
      if (modelName === 'User') {
        data = await db[modelName].findOne({
          where: { id: userId },
          raw: true,
        });
      } else {
        data = await db[modelName].findOne({ where: { userId }, raw: true });
      }
      const { password, ...resData } = data;
      if (!data) {
        resolve({
          status: 404,
          payload: {
            message: 'Data not found',
          },
        });
      }
      resolve({
        status: 200,
        payload: {
          message: `Get data successfully`,
          data: resData,
        },
      });
    } catch (err) {
      reject(err);
    }
  });
}

export { getAllData, getDataByUserId };
