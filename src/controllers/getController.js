import * as getService from '../services/getService';

class GetController {
  async getAllDataFromWordle(req, res) {
    try {
      const { status, payload } = await getService.getAllData(
        'Wordle',
        req.query
      );
      return res.status(status).json(payload);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
  async getWordleByUserId(req, res) {
    try {
      const { status, payload } = await getService.getDataByUserId(
        'Wordle',
        req.params.userId
      );
      return res.status(status).json(payload);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

export default new GetController();
