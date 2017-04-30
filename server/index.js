const http = require('http'),
      path = require('path'),
      express = require('express'),
      app = express(),
      twilio = require('twilio'),
      bodyParser = require('body-parser'),
      cfg = require('../config.js'),
      accountSid = cfg.accountSid,
      authToken = cfg.authToken,
      casper = cfg.casper,
      ghostee = cfg.ghostee,
      twilioNumber = cfg.twilioNumber,
      client = twilio(accountSid, authToken);

app.use(express.static(`${ __dirname }/app`));
// app.use(express.static(`${ __dirname }/../node_modules`));

app.use(bodyParser.json()); // handle json data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.post('/', function(req, res) {
  client.sms.messages.create({
      to: casper,
      from: twilioNumber,
      body: req.body.Body
  }, function(error, message) {
    if (!error) {
      console.log('Success! The SID for this SMS message is:');
      console.log(message.sid);

      console.log('Message sent on:');
      console.log(message.dateCreated);
    } else {
      console.log('Oops! There was an error.', message);
    }
  });
});

app.post('/spaceghost', function(req, res) {
  console.log('I hit the route!')
  console.log('REQUEST', req.body);

  client.sms.messages.create({
      to: ghostee,
      from: twilioNumber,
      body: req.body.Body
  }, function(error, message) {
      if (!error) {
             console.log('Success! The SID for this SMS message is:');
             console.log(message.sid);
             console.log('Message sent on:');
             console.log(message.dateCreated);
         } else {
             console.log('Oops! There was an error.', message);
         }
  });
});

app.listen(2001, function () {
  console.log('Space Ghost listening on port 2001!');
});

module.exports = app;
