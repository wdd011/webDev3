const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const app = express()
// 端口号
const PORT = 3002
// 解决跨域问题
app.use(cors())
// 配置数据库信息
const db = mysql.createConnection({
  host: 'localhost', // IP
  user: 'root', // 用户名
  password: '123456', // 密码
  database: 'crowdfunding_db2', // 数据库名称
})
db.connect(err => {
  if (err) {
    return new Error('数据库连接失败')
  }
})

// 获取首页列表
app.get('/fundraisers', (req, res) => {
  db.query(
    `
    SELECT f.*, c.NAME AS CATEGORY_NAME 
    FROM fundraisers f 
    JOIN categories c ON f.CATEGORY_ID = c.CATEGORY_ID
    WHERE f.ACTIVE = 1;
  `,
    (err, results) => {
      if (err) {
        res.status(500).json({ error: '服务端错误' })
      } else {
        res.json(results)
      }
    }
  )
})

// 获取分类
app.get('/categories', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      res.status(500).json({ error: '服务端错误' })
    } else {
      res.json(results)
    }
  })
})
app.get('/search', (req, res) => {
  const { category, city, organizer } = req.query
  let query = `
    SELECT f.*, c.NAME AS CATEGORY_NAME 
    FROM fundraisers f 
    JOIN categories c ON f.CATEGORY_ID = c.CATEGORY_ID
  `
  if (category) {
    query += ` AND f.CATEGORY_ID = ${db.escape(category)}`
  }
  if (city) {
    query += ` AND f.CITY LIKE ${db.escape('%' + city + '%')}` //模糊查询
  }
  if (organizer) {
    query += ` AND f.ORGANIZER LIKE ${db.escape('%' + organizer + '%')}` // 模糊查询
  }
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: '服务端错误' })
    } else {
      res.json(results)
    }
  })
})

// 查询详情
app.get('/fundraiser/:id', (req, res) => {
  const fundraiserId = req.params.id

  //  fundraisers 表中选择所有列
  // c.NAME AS CATEGORY_NAME: 查询categories表 把NAME重命名CATEGORY_NAME
  const query = `
    SELECT f.*, c.NAME AS CATEGORY_NAME 
    FROM fundraisers f 
    JOIN categories c ON f.CATEGORY_ID = c.CATEGORY_ID
    WHERE f.FUNDRAISER_ID = ?
  `
  db.query(query, [fundraiserId], (err, results) => {
    if (err) {
      res.status(500).json({ error: '服务端错误' })
    } else {
      // 返回符合条件的
      res.json(results[0])
    }
  })
})
// 启动项目
app.listen(PORT, () => {
  console.log('启动成功： http://localhost:' + PORT)
})
