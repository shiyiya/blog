import mysql from 'mysql';
import { mysqlConfig } from './config';

const pool = mysql.createPool(mysqlConfig);

const query = (sql, value) =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error(`error connecting: ${err.stack}`);
        reject(err);
      }
      connection.query(sql, value, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          // console.log(rows)
          resolve(rows);
        }
        connection.release();
      });
    });
  });

exports.query = query;

/* 用户相关 */
exports.signup = value =>
  query('insert into users set name=?,password=?;', value);

exports.findUserByname = name =>
  query(`select name,password from users where name='${name}';`);

exports.findUserByToken = token =>
  query(`select * from users where token='${token}';`);

exports.setUserRoles = (user_id, role_id) =>
  query('insert into users_role set user_id=?,role_id=?;', [user_id, role_id]);

exports.updateUserToken = value =>
  query('update users set token=? where name=?', value);

exports.selectAllPermission = () => query(`select * from permissions`);

exports.selectPermissionById = id =>
  query(`select name from permissions where FIND_IN_SET(_id, '${id}')`);

exports.searchUserRolesByUser = id =>
  query(`select role_id from users_role where user_id=${id}`);

exports.searchUserPermissionByRole = id =>
  query(`select permission_id from roles_permission where role_id=${id}`);

/*
 *文章相关
 */
exports.posts = (offset, limit) =>
  query(
    `select * from posts ORDER BY created desc LIMIT ${(offset - 1) *
      limit},${limit};`
  );

exports.publishPost = value =>
  query(
    'insert into posts set authorId=?,title=?,text=?,allowComment=?,created=?;',
    value
  );

exports.getPostInfo = id => query(`select * from posts where pid = ${id}`);

exports.deletePost = id => query(`delete from posts where pid = ${id}`);

exports.comment = value =>
  query(
    'insert into comments set authorId=?,author=?,ownerId=?,text=?;',
    value
  );

exports.updatePostCommentsNum = (pid, action) =>
  query(`select commentsNum from comments where pid=${pid}`).then(_ => {
    const num = action ? _[0].commentsNum + 1 : _[0].commentsNum - 1;
    query(`insert into posts set commentsNum=${num};`);
  });
