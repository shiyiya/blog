import md5 from 'md5';
import DBModel from '../db/index';

export default async (ctx, next) => {
  const { username, password, author } = ctx.request.body;
  const user = await DBModel.findUserByname(username);

  if (user.length >= 1) {
    ctx.body = { status: 0, msg: '昵称已被占用' };
  } else {
    try {
      const userInsertInfo = await DBModel.signup([username, md5(password)]);
      let ROLE_ID;

      if (author) {
        await DBModel.setUserRoles(userInsertInfo.insertId, (ROLE_ID = 1));
      } else {
        await DBModel.setUserRoles(userInsertInfo.insertId, (ROLE_ID = 2));
      }

      ctx.body = {
        status: 1,
        msg: '注册成功',
        data: {
          user_id: userInsertInfo.insertId,
          role_id: ROLE_ID,
        },
      };
    } catch (err) {
      // 回滚
      // .....
      ctx.body = {
        status: 0,
        msg: JSON.stringify(err),
      };
    }
  }
};
