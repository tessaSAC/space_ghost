const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.listen(2001, function () {
  console.log('Example app listening on port 2001!');
})