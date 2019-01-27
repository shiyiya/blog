import DBModel from '../db/index'
import md5 from 'md5'

export default async (ctx, next) => {
  const { username, password, author } = ctx.request.body
  const user = await DBModel.findUserByname(username)

  if (user.length >= 1) {
    ctx.body = { status: 0, msg: '昵称已被占用' }
  } else {
    try {
      const userInsertInfo = await DBModel.signup([username, md5(password)])
      if (!!author) {
        await DBModel.setUserRoles(userInsertInfo.insertId, 1)
      }
      ctx.body = {
        status: 1,
        msg: '注册成功',
        data: {
          user_id: userInsertInfo.insertId
        }
      }
    } catch (err) {
      // 回滚
      // .....
      ctx.body = {
        status: 0,
        msg: JSON.stringify(err)
      }
    }
  }
}
