const http = require('http'),
      path = require('path'),
      express = require('express'),
      app = express(),
      twilio = require('twilio'),
      bodyParser = require('body-parser'),
      cfg = require('../config'),
      accountSid = cfg.accountSid,
      authToken = cfg.authToken,
      user = cfg.user,
      sender = cfg.sender,
      twilioNumber = cfg.twilioNumber,
      client = twilio(accountSid, authToken),
      senderMessages = [];
let numPreviousMessages = 0;

app.use(express.static(path.join(__dirname , '/app')));

app.use(bodyParser.json()); // handle json data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')))

app.get('/assets/gus.png', (req, res) => res.sendFile(path.join(__dirname, '../app/assets/gus.png')));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/index.html'))
// })

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
})

app.get('/messageInbox', (req, res) => {
  // console.log(numPreviousMessages, senderMessages.length)
  // if (numPreviousMessages !== senderMessages.length) {
  //   res.send(senderMessages.slice(numPreviousMessages));
  //   numPreviousMessages = senderMessages.length;
  // }
  // else res.send(null);
  // console.log('sending messages');
  res.send(senderMessages);
});

app.post('/', function(req, res) {
  // console.log(numPreviousMessages, senderMessages.length)
  senderMessages.push(req.body);
  // console.log('numMessages in inbox:', senderMessages.length);
  // console.log(numPreviousMessages, senderMessages.length)

  client.sms.messages.create({
      to: user,
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
      to: sender,
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
