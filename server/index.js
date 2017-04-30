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

app.use(express.static('./app'));

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
             // The second argument to the callback will contain the information
             // sent back by Twilio for the request. In this case, it is the
             // information about the text messsage you just sent:
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
 //    const twiml = new twilio.TwimlResponse();
    // twiml.message(function() {
    //  this.body('hi');
    // });

 //    res.writeHead(200, {'Content-Type': 'text/xml'});
 //    res.end(twiml.toString());

 //    console.log(req.body.textmsg)

  client.sms.messages.create({
      to: ghostee,
      from: twilioNumber,
      body: req.body.textmsg
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
