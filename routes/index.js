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
  var newContact = req.body.newContact;
  var name = newContact.name
  var lastName = newContact.lastName;
  var company = newContact.company;
  var phone = newContact.phone;
  var email = newContact.email;

  if (!name || /\d/.test(name)) {
    res.status(500).send(`Error in name: ${name}`);
    return;
  }

  if (!lastName || /\d/.test(lastName)) {
    res.status(500).send(`Error in lastName: ${lastName}`);
    return;
  }

  if (company && !(/^[A-Za-z0-9\s]+$/.test(company))) {
    res.status(500).send(`Error in company: ${company}`);
    return;
  }

  if (phone && !(/^[0-9]+$/.test(phone))) {
    res.status(500).send(`Error in phone: ${phone}`);
    return;
  }

  if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
    res.status(500).send(`Error in email: ${email}`);
    return;
  }

  try {
    const client = await pool.connect();
    if( !phone )  {
      var queryString = `INSERT INTO contacts(userId, name, lastName, company, phone, email) 
                        VALUES ('${0}', '${name}', '${lastName}', '${company}', NULL, '${email}')`;
    }
    else  {
      var queryString = `INSERT INTO contacts(userId, name, lastName, company, phone, email) 
                        VALUES ('${0}', '${name}', '${lastName}', '${company}', '${phone}', '${email}')`;
    }
    
    const result = await client.query(queryString);
    const results = { 'results': (result) ? result.rows : null };
    res.json({ rows: results });
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }

});

router.get('/db', async function (req, res, next) {
  try {
    const client = await pool.connect();
    const queryString = `SELECT * FROM contacts ORDER BY name`;
    const result = await client.query(queryString);
    const results = { 'results': (result) ? result.rows : null };
    res.json({ rows: results });
    client.release();
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

router.patch('/db', async function (req, res, next) {
  console.log(req.body);

  if (!req.body.updatedContact.delete) {
    var name = req.body.updatedContact.name;
    var lastName = req.body.updatedContact.lastName;
    var company = req.body.updatedContact.company;
    var phone = req.body.updatedContact.phone;
    var email = req.body.updatedContact.email;
    var originalEmail = req.body.updatedContact.originalEmail;

    if (!name || /\d/.test(name)) {
      res.status(500).send(`Error in name: ${name}`);
      return;
    }

    if (!lastName || /\d/.test(lastName)) {
      res.status(500).send(`Error in lastName: ${lastName}`);
      return;
    }

    if (company && !(/^[A-Za-z0-9\s]+$/.test(company))) {
      res.status(500).send(`Error in company: ${company}`);
      return;
    }

    if (phone && !(/^[0-9]+$/.test(phone))) {
      res.status(500).send(`Error in phone: ${phone}`);
      return;
    }

    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
      res.status(500).send(`Error in email: ${email}`);
      return;
    }

    if( !phone )  {
      var query = `UPDATE contacts SET (name,lastname,company,phone,email) =
                  ('${name}','${lastName}','${company}',NULL,'${email}')
                  WHERE email = '${originalEmail}'`;
    }
    else  {
      var query = `UPDATE contacts SET (name,lastname,company,phone,email) =
                  ('${name}','${lastName}','${company}','${phone}','${email}')
                  WHERE email = '${originalEmail}'`;
    }
    
  }
  else {
    var mail = req.body.updatedContact.mail;
    var query = `DELETE FROM contacts WHERE email = '${mail}'`;
  }

  try {
    const client = await pool.connect();
    const result = await client.query(query);
    const results = { 'results': (result) ? result.rows : null };
    res.json({ rows: results });
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});


module.exports = router;
