const http = require('http'),
	  express = require('express'),
	  app = express(),
	  twilio = require('twilio'),
	  bodyParser = require('body-parser'),
      mongoConnectionString = "mongodb://127.0.0.1:27017/agenda",
      Agenda = require('agenda'),
      agenda = new Agenda({db: {address: mongoConnectionString}}),
      config = require('./config');

var client = require('twilio')(config.accountSid, config.authToken);

agenda.define('send text message', function(job) {
    client.sms.messages.create({
        to: config.ghostee,
        from: config.twilioNumber,
        body: "SPACE SUCCESS",
    }, function(err, message) {
        if(err) {
            console.error('SPACE ERROR!!!!')
            console.error(err)
        } else {
            console.log('Space success')
        }
    });
});

agenda.on('ready', function() {
  agenda.every('5 seconds', 'send text message');
  agenda.start();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.post('/', function(req, res) {
    const twiml = new twilio.TwimlResponse();
	twiml.message(function() {
		this.body(req.body.Body);
	});

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

app.listen(2001, function () {
  console.log('Example app listening on port 2001!');
})
