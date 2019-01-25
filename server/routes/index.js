import signup from './signup'
import signin from './signin'

module.exports = router => {
  // 注册
  router.post('/signup', signup)

  // 登陆
  router.post('/signin', signin)

  // 获取文章 | offset limit tab
  router.get('/posts')

  // 发布文章
  router.post('/post')

  //审核文章
  // router.post('post/:id/review')

  // 文章详情
  router.get('/post/:id')

  //修改文章 | id
  router.post('/post/update')

  // 评论文章 | 回复他人评论 comentid
  router.post('/post/:post_id/comment')

  return router.routes()
}
