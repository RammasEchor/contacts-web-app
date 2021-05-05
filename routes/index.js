var express = require('express');
var router = express.Router();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// const pool = new Pool({
//   user: 'luis.nieto',
//   host: 'localhost',
//   database: 'luis.nieto',
//   port: 5432,
// })
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
// const client = new Client({
//   user: 'luis.nieto',
//   host: 'localhost',
//   database: 'luis.nieto',
//   port: 5432,
// })
// client.connect()
// client.query('SELECT * FROM test', (err, res) => {
//   console.log(err, res.rows)
//   client.end()
// })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test');
    const results = { 'results': (result) ? result.rows : null};
    res.json({rows: results} );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})


module.exports = router;
