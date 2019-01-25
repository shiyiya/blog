import DBModel from '../db/index'
import jwt from 'jsonwebtoken'
import md5 from 'md5'
import { JWT_KEY } from '../db/config'

export default async (ctx, next) => {
  const { username, password } = ctx.request.body
  const user = await DBModel.findUserByname(username)
  if (user.length < 1 || user[0].password !== md5(password)) {
    ctx.status = 400
    ctx.body = { status: 0, msg: '用户名或密码错误' }
  } else {
    const token = jwt.sign({ name: user.username }, JWT_KEY, {
      expiresIn: '7d'
    })
    DBModel.updateUserToken([token, user[0].name])
    //ctx.cookies.set('token', token, { signed: true ,httpOnly: true,expires: Date.now() + 60 * 60})
    ctx.body = { status: 1, msg: '登陆成功', data: { token, username } }
  }
}
