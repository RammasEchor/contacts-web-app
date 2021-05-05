var express = require('express');
var router = express.Router();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Contacts App' });
});

router.post('/db', async function (req, res, next) {
  console.log(req.body);
  var name = req.body.newContact.name;
  var lastName = req.body.newContact.lastName;
  var company = req.body.newContact.company;
  var phone = req.body.newContact.phone;
  var email = req.body.newContact.email;

  const client = await pool.connect();
  var queryString = `INSERT INTO contacts(userId, name, lastName, company, phone, email) 
                        VALUES ('${0}', '${name}', '${lastName}', '${company}', '${phone}', '${email}')`;

  client.query(queryString, (err, response) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      res.sendStatus(200);
    }
  });

});

router.get('/db', async function (req, res, next) {
  console.log(req.body);
  const client = await pool.connect();
  var queryString = `SELECT * FROM contacts`;
  console.log(queryString);
  query = client.query(queryString, (err, response) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      console.log( response.rows );
      res.json({rows: response.rows});
    }
  });
});


module.exports = router;
