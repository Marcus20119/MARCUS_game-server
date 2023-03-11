import * as getService from '../services/getService';

class GetController {
  async handleTest(req, res) {
    try {
      const { status, payload } = await getService.handleTest(req.body);
      return res.status(status).json(payload);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

export default new GetController();
