var express = require('express');
var router = express.Router();


const { Pool, Client } = require('pg')
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

// console.log( req.body );
//     const client = new Client({
//       user: 'luis.nieto',
//       host: 'localhost',
//       database: 'luis.nieto',
//       port: 5432,
//     })
//     client.connect()
//     query = client.query('SELECT * FROM test', (err, table) => {
//       console.log( table.rows )
//       res.json( { rows : table.rows } )
//       client.end()
//   })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contacts App' });
});

router.post('/db', function(req, res, next) {
    console.log( req.body );
    if( req.body.newContact.name != 'Luis') {
      res.sendStatus(500);
      return ;
    }

    res.sendStatus(200);
});

module.exports = router;
