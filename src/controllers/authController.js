import * as authService from '../services/authService';

class CrudController {
  async handleSignIn(req, res) {
    try {
      const { status, payload } = await authService.handleSignIn(req.body);
      return res.status(status).json(payload);
    } catch (err) {
      console.log(err);
    }
  }
  async handleSignUp(req, res) {
    try {
      const { status, payload } = await authService.handleSignUp(req.body);
      return res.status(status).json(payload);
    } catch (err) {
      console.log(err);
    }
  }
  async handleRefreshToken(req, res) {
    try {
      const { status, payload } = await authService.handleRefreshToken(
        req.body
      );
      return res.status(status).json(payload);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new CrudController();
