# A contacts web app

This is a little web application that stores information of a contact;

- Name: Required, Only Text.
- Last Name: Required, Only Text.
- Company (Optional): Alphanumeric
- Phone (Optional): Only Numbers, Unique
- Email: Valid email, Unique

Validation for this are done in the frontend, backend and constraints in the database.

## Tools

- *Node.js* with *Express* for the backend and the frontend.
- *Bulma* as css framework.
- *Postgresql* as the database.
- Deployment in *Heroku*.

## API

Four (4) endpoints:

- `GET '/'`: This fetches the main webpage.
- `GET '/db'`: Fetches all the contacts.
- `POST '/db`: Tries to create a contact.
- `PATCH '/db`: Tries to modify/delete a contact.

The payload is sent as a json.

## Characteristics

- Create, modify, and delete contacts
- Pagination of 10 contacts per page
- Filter by name/last name (one string filters for both).
