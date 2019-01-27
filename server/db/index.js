import mysql from 'mysql'
import { mysqlConfig, blogInfo } from './config'

const pool = mysql.createPool(mysqlConfig)

const query = (sql, value) =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('error connecting: ' + err.stack)
        reject(err)
      }
      connection.query(sql, value, (err, rows) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          //console.log(rows)
          resolve(rows)
        }
        connection.release()
      })
    })
  })

exports.query = query

/* 用户相关 */
exports.signup = value =>
  query('insert into users set name=?,password=?;', value)

exports.findUserByname = name =>
  query(`select name,password from users where name='${name}';`)

exports.findUSerByToken = token =>
  query(`select * from users where token=${token};`)

exports.setUserRoles = (user_id, role_id) =>
  query('insert into users_role set user_id=?,role_id=?;', [user_id, role_id])

exports.updateUserToken = value =>
  query('update users set token=? where name=?', value)

/* 文章相关 */
exports.publishPost = value =>
  query(
    'insert into posts set authorId=?,title=?,text=?,allowComment=?;',
    value
  )

exports.comment = value =>
  query('insert into comments set authorId=?,author=?,ownerId=?,text=?;', value)

exports.updatePostCommentsNum = (pid, action) =>
  query(`select commentsNum from comments where pid=${pid}`).then(_ => {
    const num = !!action ? _[0].commentsNum + 1 : _[0].commentsNum - 1
    query(`insert into posts set commentsNum=${num};`)
  })

exports.posts = (offset, limit) =>
  query(
    `select * from posts ORDER BY created desc LIMIT ${limit *
      blogInfo.limitP},${limit} ;`
  )

exports.getPostInfo = id => query(`select * from posts where pid = ${id}`)

exports.deletePost = id => query(`delete from posts where pid = ${id}`)
