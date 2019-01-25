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

exports.signup = value =>
  query('insert into users set name=?,password=?;', value)

exports.setUserRoles = (user_id, role_id) =>
  query('insert into users_role set user_id=?,role_id=?;', [user_id, role_id])

exports.findUserByname = name =>
  query(`select name,password from users where name="${name}";`)

exports.updateUserToken = value =>
  query('update users set token=? where name=?', value)

exports.posts = (offset, limit) =>
  query(
    `select * from posts ORDER BY created desc LIMIT ${limit *
      blogInfo.limitP},${limit} ;`
  )

exports.getPostInfo = id => query(`select * from posts where pid = ${id}`)

exports.publishPost = value =>
  query(
    'insert into posts set authorId=?,title=?,text=?,pid=?,allowComment=?;',
    value
  )

exports.deletePost = id => query(`delete from posts where pid = ${id}`)
