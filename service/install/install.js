import DBModel from '../db/index';
import mysqlSchema from './mysql';
import {
  defaultAdmin,
  permissions,
  roles,
  roles_permission,
} from '../db/config';

for (const _key in mysqlSchema) {
  try {
    DBModel.query(mysqlSchema[_key]);
    console.log(`[created table]: --> ${_key}`);
  } catch (err) {
    console.log(`[create database error!]: --> ${_key}`);
  }
}

const DBpermission = [];

//权限
for (const permission of permissions) {
  DBModel.query(
    'insert into permissions set _id=?,name=?,description=?',
    Object.values(permission)
  );
}

//角色
for (const role of roles) {
  DBModel.query(
    'insert into roles set _id=?,name=?,description=?',
    Object.values(role)
  );
}

// 角色权限绑定
for (const rp of roles_permission) {
  rp.permission.map(p => {
    DBModel.query(
      'insert into roles_permission set role_id=?,permission_id=?',
      [rp._id, p]
    );
  });
}

// 创建用户
DBModel.query(
  'insert into users set name=?,password=?,created=?;',
  Object.values(defaultAdmin)
).then(res => {
  // 设置为管理员
  DBModel.query('insert into users_role set user_id=?,role_id=?', [
    res.insertId,
    0,
  ]);
  // 发布第一篇文章
  DBModel.publishPost([res.insertId, 'hello world!', 'hello world!', 1]).then(
    _ => {
      // 评论文章
      DBModel.comment([
        res.insertId,
        defaultAdmin.name,
        _.insertId,
        'hello world',
      ]);
    }
  );
});

console.log('数据初始化完成，`ctrl + c` 关闭终端');

//DBModel.query('DROP TABLE `comments`, `permissions`, `posts`, `roles`, `roles_permission`, `users`, `users_role`;')
