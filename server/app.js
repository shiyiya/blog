import path from 'path'
import Koa from 'koa'
import Router from 'koa-router'
import parser from 'koa-bodyparser'
import cors from 'koa2-cors'
import koaStatic from 'koa-static'

import { JWT_KEY } from './db/config'
import routes from './routes/index'
import checkToken from './middleware/check-token'

const app = new Koa()
const router = new Router()

// 发布文章，评论, 审核 | 简单的 Token 验证（未判断权限）
app.use(
  checkToken({
    key: JWT_KEY,
    path: [
      /\/post$/,
      /\/post\/\d+\/comment/,
      /\/post\/\d+\/update/,
      /\/post\/\d+\/review/
    ]
  })
)

app
  .use(cors())
  .use(parser())
  .use(routes(router))
  .use(koaStatic(path.join(__dirname, 'public')))

app.listen(3000, 'localhost', () => {
  console.log('----- server listening ! -----')
})
