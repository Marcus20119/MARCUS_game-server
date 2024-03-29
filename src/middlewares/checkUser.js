import db from '../models';

async function checkPlayer(req, res, next) {
  try {
    const userData = await db.User.findOne({
      where: { id: req.id },
      raw: true,
    });

    if (userData.roleId >= 0) {
      next();
    } else {
      return res.status(401).json({
        message: 'User does not have access to call this request',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

async function checkAdmin(req, res, next) {
  try {
    const userData = await db.User.findOne({
      where: { id: req.id },
      raw: true,
    });

    if (userData.roleId >= 1) {
      next();
    } else {
      return res.status(401).json({
        message: 'User does not have access to call this request',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

export { checkPlayer, checkAdmin };
