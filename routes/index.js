var express = require('express');
var router = express.Router();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


function getClient()  {
  return client = new Client({
    user: 'luis.nieto',
    host: 'localhost',
    database: 'contacts',
    port: 5432,
  });
}

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
  client.release();

});

router.get('/db', async function (req, res, next) {
  try {
    const client = await pool.connect();
    const queryString = `SELECT * FROM contacts`;
    const result = await client.query(queryString);
    const results = { 'results': (result) ? result.rows : null};
    res.json({rows: results});
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

router.patch('/db', function (req, res, next) {
  console.log(req.body);

  var name = req.body.updatedContact.name;
  var lastName = req.body.updatedContact.lastName;
  var company = req.body.updatedContact.company;
  var phone = req.body.updatedContact.phone;
  var email = req.body.updatedContact.email;
  var originalEmail = req.body.updatedContact.originalEmail;

  const query = `UPDATE contacts SET (name,lastname,company,phone,email) =
                  ('${name}','${lastName}','${company}','${phone}','${email}')
                  WHERE email = '${originalEmail}'`;

  const client = getClient();
  client.connect()
  console.log(query);
  client.query(query, (err, response) => {
    if (err) {
      console.log(err);
      console.log( response );
      res.sendStatus(500);
    }
    else {
      res.sendStatus(200);
    }
  });
});


module.exports = router;
