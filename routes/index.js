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

  var newContact = req.body.newContact;
  console.log(newContact);

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
    var queryString = `INSERT INTO contacts(userId, name, lastName, company, phone, email) 
                        VALUES ('${0}', '${name}', '${lastName}', '${company}', '${phone}', '${email}')`;
    const result = await client.query(queryString);
    console.log(queryString);
    const results = { 'results': (result) ? result.rows : null };
    res.json({ rows: results });
    client.release();
  } catch (err) {
    console.error("LOOK: " + err);
    res.status(500).send("Error: " + err);
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
    res.send("Error " + err);
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

    var contactHasError = false;

    if (!name || /\d/.test(name)) {
      var errorMsg = 'Name required and may not have numbers'
      document.getElementById('errorTextName').innerText = errorMsg;
      contactHasError = true;
    }

    if (!lastName || /\d/.test(lastName)) {
      var errorMsg = 'Last Name required and may not have numbers';
      document.getElementById('errorTextLastName').innerText = errorMsg;
      contactHasError = true;
    }

    if (company && !(/^[A-Za-z0-9\s]+$/.test(company))) {
      var errorMsg = 'Company may be empty, but may not have symbols';
      document.getElementById('errorTextCompany').innerText = errorMsg;
      contactHasError = true;
    }

    if (phone && !(/^[0-9]+$/.test(phone))) {
      var errorMsg = 'Phone may be empty, or only be numbers';
      document.getElementById('errorTextPhone').innerText = errorMsg;
      contactHasError = true;
    }

    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
      var errorMsg = 'Is not a valid email address';
      document.getElementById('errorTextEmail').innerText = errorMsg;
      contactHasError = true;
    }

    if (contactHasError) {
      console.log('Error in contact data.');
      res.status(500).send('Ha; try again.');
    }

    var query = `UPDATE contacts SET (name,lastname,company,phone,email) =
                  ('${name}','${lastName}','${company}','${phone}','${email}')
                  WHERE email = '${originalEmail}'`;
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
    res.send("Error " + err);
  }
});


module.exports = router;
