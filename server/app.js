import Koa from 'koa'
import Router from 'koa-router'
import parser from 'koa-bodyparser'
import cors from 'koa2-cors'
import KJwt from 'koa-jwt'

import { JWT_KEY } from './db/config'
import routes from './routes/index'

const app = new Koa()
var router = new Router()

app
  .use(cors())
  .use(parser())
  .use(routes(router))

app.use(async (ctx, next) =>
  next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        status: 0,
        msg: '请登陆！'
      }
    } else {
      ctx.body = {
        status: 0,
        msg: err
      }
    }
  })
)

app.use(
  KJwt({ secret: JWT_KEY }).unless({
    path: [/\/post$/, /\/update/, /\/comment/]
  })
)

app.listen(3000, 'localhost', () => {
  console.log('----- server listening ! -----')
})
