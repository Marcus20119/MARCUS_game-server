import db from '../models';

async function handleSaveWordleResult(clientData) {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra xem data cos status và userId hay không
      if (!clientData.status && !clientData.userId) {
        resolve({
          status: 422,
          payload: {
            message: 'Missing parameters',
          },
        });
      }
      // Kiểm tra xem data cos status và userId hay không
      if (clientData.status === 'win' && !clientData.currentRow) {
        resolve({
          status: 422,
          payload: {
            message: 'Missing "currentRow" parameter',
          },
        });
      }

      const userWordleData = await db.Wordle.findOne({
        where: { userId: clientData.userId },
        raw: true,
      });

      // Nếu đã có dữ liệu chơi trước đây thì cập nhật
      if (userWordleData) {
        let { id, ...newUserWordleData } = userWordleData;
        if (clientData.status === 'lose') {
          newUserWordleData.nLose = userWordleData.nLose + 1;
        } else if (clientData.status === 'win') {
          newUserWordleData[`nWinR${clientData.currentRow}`] =
            userWordleData[`nWinR${clientData.currentRow}`] + 1;
        }
        newUserWordleData.nPlay = userWordleData.nPlay + 1;
        await db.Wordle.update(newUserWordleData, {
          where: {
            userId: clientData.userId,
          },
        });
        // Nếu là lần đầu tiên chơi thì tạo dữ liệu mới
      } else {
        let newUserWordleData = {
          userId: clientData.userId,
          nWinR1: 0,
          nWinR2: 0,
          nWinR3: 0,
          nWinR4: 0,
          nWinR5: 0,
          nWinR6: 0,
          nLose: 0,
          nPlay: 1,
        };
        if (clientData.status === 'lose') {
          newUserWordleData.nLose = 1;
        } else if (clientData.status === 'win') {
          newUserWordleData[`nWinR${clientData.currentRow}`] = 1;
        }
        await db.Wordle.create(newUserWordleData);
      }

      resolve({
        status: 200,
        payload: {
          message: "Update user's wordle data successfully",
        },
      });
    } catch (err) {
      reject(err);
    }
  });
}

export { handleSaveWordleResult };
