const express = require('express');
const pg = require('pg');
require('dotenv').config();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();
const client = new pg.Client(DATABASE_URL);
client.connect();

app.use(express.static('./public'));

app.get('/api/candy', (request, response) => {
  client.query('SELECT * FROM candy;')
    .then(results => {
      response.send(results.rows);
    }).catch(error => {
      response.status(500).send(error);
    })
});

app.listen(PORT, () => console.log('Listening on PORT', PORT));