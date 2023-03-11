import * as postService from '../services/postService';

class PostController {
  async handleSaveWordleResult(req, res) {
    try {
      const { status, payload } = await postService.handleSaveWordleResult(
        req.body
      );
      return res.status(status).json(payload);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

export default new PostController();
