import signup from './signup';
import signin from './signin';
import posts from './posts';
import post from './post';

module.exports = (router) => {
  // 注册
  router.post('/signup', signup);

  // 登陆
  router.post('/signin', signin);

  // 获取文章 | offset limit tab
  router.get('/posts', posts);

  // 发布文章
  router.post('/post', post);

  // 审核文章
  // router.post('post/:id/review')

  // 文章详情
  // router.get('/post/:id', post)

  // 修改文章 | id
  // router.post('/post/:id/update',post)

  // 评论文章 | 回复他人评论 comentid
  // router.post('/post/:post_id/comment',post)

  return router;
};
