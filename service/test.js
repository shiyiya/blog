/* eslint-disable no-unused-vars */
/* var mysql = require('mysql')

var mysqlConfig = {
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  //password: 'root',
  database: 'blog',
  connectTimeout: 3000
}

console.log(1)
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

query('select commentsNum from posts where pid=1').then(function(_) {
  var a=_
  console.log(JSON.stringify(a[0].commentsNum))
})
 */

const jwt = require('jsonwebtoken');

const b = 'eyJhbGciOiJIUzI1NiIsInR5c  CI6IkpXVCJ9.eyJpYXQiOjE1NDg0MDU4MzQsImV4cCI6MTU0OTAxMDYzNH0.zwVDv-uIfaUBzGFxV6F25Amyoh5fom0upe4W44cQYwk';

jwt.verify(b, 'Shiyi', (err, decoded) => {
  console.log(err); // bar
});
