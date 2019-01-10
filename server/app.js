import Koa from 'koa'

const app = new Koa()

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000, 'localhost', () => {
  console.log('localhost: 3000 server listen')
})
