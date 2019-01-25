import DBModel from '../db/index'
import mysqlSchema from './mysql'
import {
  defaultAdmin,
  permissions,
  roles,
  roles_permission
} from '../db/config'

for (const _key in mysqlSchema) {
  DBModel.query(mysqlSchema[_key])
  console.log(`created table --> ${_key}`)
}

const DBpermission = []

//权限
for (const permission of permissions) {
  DBModel.query(
    'insert into permissions set _id=?,name=?,description=?',
    Object.values(permission)
  )
}

//角色
for (const role of roles) {
  DBModel.query(
    'insert into roles set _id=?,name=?,description=?',
    Object.values(role)
  )
}

// 角色权限绑定
for (const rp of roles_permission) {
  DBModel.query(
    'insert into roles_permission set role_id=?,permission_id=?',
    Object.values(rp)
  )
}

// 创建用户并设置为管理员
DBModel.query(
  'insert into users set name=?,password=?,created=?;',
  Object.values(defaultAdmin)
).then(res => {
  DBModel.query('insert into users_role set user_id=?,role_id=?', [
    res.insertId,
    0
  ])
})

console.log('数据初始化完成，`ctrl + c` 关闭终端')
