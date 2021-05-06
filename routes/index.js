var express = require('express');
var router = express.Router();

const { Pool, Client } = require('pg')

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

router.post('/db', function (req, res, next) {
  console.log(req.body);
  var name = req.body.newContact.name;
  var lastName = req.body.newContact.lastName;
  var company = req.body.newContact.company;
  var phone = req.body.newContact.phone;
  var email = req.body.newContact.email;

  const client = getClient();
  client.connect()
  var queryString = `INSERT INTO contacts(userId, name, lastName, company, phone, email) 
                        VALUES ('${0}', '${name}', '${lastName}', '${company}', '${phone}', '${email}')`;

  console.log(queryString);
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

router.get('/db', function (req, res, next) {
  console.log(req.body);

  const client = getClient();
  client.connect()
  var queryString = `SELECT * FROM contacts ORDER BY name`;
  console.log(queryString);
  client.query(queryString, (err, response) => {
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

router.patch('/db', function (req, res, next) {
  console.log(req.body);

  if( !req.body.updatedContact.delete ) {
    var name = req.body.updatedContact.name;
    var lastName = req.body.updatedContact.lastName;
    var company = req.body.updatedContact.company;
    var phone = req.body.updatedContact.phone;
    var email = req.body.updatedContact.email;
    var originalEmail = req.body.updatedContact.originalEmail;

    var query = `UPDATE contacts SET (name,lastname,company,phone,email) =
                  ('${name}','${lastName}','${company}','${phone}','${email}')
                  WHERE email = '${originalEmail}'`;
  }
  else  {
    var mail = req.body.updatedContact.mail;
    var query = `DELETE FROM contacts WHERE email = '${mail}'`;
  }

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
