import * as getService from '../services/getService';

class GetController {
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
  async getTictactoeByUserId(req, res) {
    try {
      const { status, payload } = await getService.getDataByUserId(
        'Tictactoe',
        req.params.userId
      );
      return res.status(status).json(payload);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
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
  async getAllDataFromUsers(req, res) {
    try {
      const { status, payload } = await getService.getAllData(
        'User',
        req.query,
        req.params.type
      );
      return res.status(status).json(payload);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
  async getUserByUserId(req, res) {
    try {
      const { status, payload } = await getService.getDataByUserId(
        'User',
        req.params.userId
      );
      return res.status(status).json(payload);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
  async getChartPipeData(req, res) {
    try {
      const { status, payload } = await getService.getChartPipeData();
      return res.status(status).json(payload);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

export default new GetController();
