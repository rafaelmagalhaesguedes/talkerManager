const express = require('express');

const routers = require('./routers');

const app = express();

app.use(routers);

const PORT = process.env.PORT || '3001';

// Dont remove this endpoint, its necessary for the corrector
app.get('/', (_request, response) => {
  response.status(200).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
