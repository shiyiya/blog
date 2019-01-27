import md5 from 'md5'

const mysqlConfig = {
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  //password: 'root',
  database: 'blog',
  connectTimeout: 3000
}

const defaultAdmin = {
  name: 'admin',
  password: md5('admin'),
  created: Date.now()
  //roles: 0
}

const JWT_KEY = 'Shiyi'

// 权限
const permissions = [
  { _id: 0, name: 'post', description: '发表文章' },
  { _id: 1, name: 'comment', descript: '评论' }
]

// 角色
const roles = [
  { _id: 0, name: 'admin', description: '管理员' },
  { _id: 1, name: 'author', description: '创作者' },
  { _id: 2, name: 'reader', description: '读者' }
]

// 角色权限 角色 -> 权限
const roles_permission = [
  { _id: 0, /* name: 'admin',  */ permission: JSON.stringify([0, 1]) },
  { _id: 1, /* name: 'author', */ permission: JSON.stringify([0, 1]) },
  { _id: 2, /* name: 'reader', */ permission: JSON.stringify([1]) }
]

const blogInfo = {
  name: '',
  meta: {
    descript: '',
    keyword: ''
  },
  //首页每页显示多少条数据 | false 不分页
  limit: 6
}

export {
  mysqlConfig,
  defaultAdmin,
  blogInfo,
  JWT_KEY,
  permissions,
  roles,
  roles_permission
}
