var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
import { isEmailValid } from '../helpers';

import db from '../models';
dotenv.config();

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

async function handleRefreshToken(clientData) {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra xem trong request có chứa refreshToken không
      if (!clientData.refreshToken) {
        resolve({
          status: 401,
          payload: {
            message: 'refreshToken is needed',
          },
        });
      } else {
        jwt.verify(
          clientData.refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          async (err, data) => {
            // Đoạn code này phải viết bên trong verify để lấy ra được id có trong accessKey
            const { refreshToken: userRefreshToken } =
              await db.RefreshToken.findOne({
                where: {
                  userId: data.id,
                },
                raw: true,
              });
            // Kiểm tra xem refreshToken có trong refreshToken table của user không
            if (clientData.refreshToken !== userRefreshToken) {
              resolve({
                status: 403,
                payload: {
                  message: 'refreshToken not found',
                },
              });
            }
            /**
             * Kiểm tra xem refreshToken này có chứa REFRESH_TOKEN_SECRET không
             * Nếu không thì trả lỗi
             * Nếu có thì trả về new accessToken
             *  */
            if (err) {
              resolve({
                status: 403,
                payload: {
                  message: 'Invalid refreshToken',
                },
              });
            }
            // trong data có iat và exp, 2 thông số này ta không cần thêm vào payload
            const newAccessToken = jwt.sign(
              { email: data.email, id: data.id },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: '15s',
              }
            );
            resolve({
              status: 200,
              payload: {
                message: 'Create new accessToken successfully',
                newAccessToken,
              },
            });
          }
        );
      }
    } catch (err) {
      reject(err);
    }
  });
}
async function createRefreshToken(userId, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
      /**
       * Kiểm tra xem đã có user trong table refreshTokens chưa
       * Nếu có thì cập nhật
       * Nếu không thì tạo mới
       *  */
      const user = await db.RefreshToken.findOne({
        where: { userId },
      });
      if (user) {
        user.refreshToken = refreshToken;
        user.save();
      } else {
        const refreshTokenTable = await db.RefreshToken.build({
          userId,
          refreshToken,
        });
        await refreshTokenTable.save();
      }
      resolve(refreshToken);
    } catch (err) {
      reject(err);
    }
  });
}

async function handleSignIn(signInData) {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra xem có nhập email và password không
      if (!signInData.email && !signInData.password) {
        resolve({
          status: 422,
          payload: {
            message: 'Missing input parameters',
          },
        });
      }
      const userInfo = await db.User.findOne({
        where: { email: signInData.email },
        raw: true,
      });
      // Kiểm tra có user không (Có nhập đúng email không)
      if (!userInfo) {
        resolve({
          status: 404,
          payload: {
            message: 'User is not exist',
          },
        });
      }
      // Kiểm tra có đúng mật khẩu không
      const isPasswordCorrect = bcrypt.compareSync(
        signInData.password,
        userInfo.password
      );
      if (!isPasswordCorrect) {
        resolve({
          status: 403,
          payload: {
            message: 'Wrong password',
          },
        });
      }
      // Khi mọi thứ ok thì tạo refreshToken và accessToken rồi trả dữ liệu về
      const { email, id, password, ...rest } = userInfo;
      const refreshToken = await createRefreshToken(id, { email, id });
      const accessToken = jwt.sign(
        { email, id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '15s',
        }
      );

      resolve({
        status: 200,
        payload: {
          errCode: 0,
          message: '',
          userData: { email, id, ...rest },
          accessToken,
          refreshToken,
        },
      });
    } catch (err) {
      reject(err);
    }
  });
}

async function handleSignUp(signUpData) {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra xem có nhập email và password không
      if (
        !signUpData.email &&
        !signUpData.password &&
        !signUpData.firstName &&
        !signUpData.lastName
      ) {
        resolve({
          status: 422,
          payload: {
            message: 'Missing input parameters',
          },
        });
      }
      // Check validate Email
      if (!isEmailValid(signUpData.email)) {
        resolve({
          status: 422,
          payload: {
            message: 'Invalid Email Syntax',
          },
        });
      }
      // Check validate password (Phải đúng 8 ký tự)
      if (signUpData.password.length !== 8) {
        resolve({
          status: 422,
          payload: {
            message: 'Password must be 8 characters',
          },
        });
      }

      const isAlreadyExist = await db.User.findOne({
        where: { email: signUpData.email },
        raw: true,
      });
      // Kiểm tra xem đã tồn tại User này chưa
      if (isAlreadyExist) {
        resolve({
          status: 409,
          payload: {
            message: 'User has already existed',
          },
        });
      }

      // Không có lỗi thì tạo user mới và lưu vào database
      const newUser = await db.User.build({
        ...signUpData,
        password: bcrypt.hashSync(signUpData.password, salt),
        role: 0,
      });
      await newUser.save();

      // Khi mọi thứ ok thì tạo refreshToken và accessToken rồi trả dữ liệu về
      const userInfo = await db.User.findOne({
        where: { email: signUpData.email },
        raw: true,
      });
      const { email, id, password, ...rest } = userInfo;
      const refreshToken = await createRefreshToken(id, { email, id });
      const accessToken = jwt.sign(
        { email, id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '60s',
        }
      );

      resolve({
        status: 200,
        payload: {
          message: 'Sign Up successfully',
          userData: { email, id, ...rest },
          accessToken,
          refreshToken,
        },
      });
    } catch (err) {
      reject(err);
    }
  });
}

export { handleSignIn, handleSignUp, handleRefreshToken };
