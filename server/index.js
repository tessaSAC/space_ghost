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
      client = twilio(accountSid, authToken),
      mongoConnectionString = "mongodb://127.0.0.1:27017/agenda",
      Agenda = require('agenda'),
      agenda = new Agenda({db: {address: mongoConnectionString}});

app.use(express.static('./app'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.post('/', function(req, res) {

});

agenda.define('send text message', function(job) {
    client.sms.messages.create({
        to: ghostee,
        from: twilioNumber,
        body: job.attrs.data,
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
  agenda.cancel({name: 'send text message'}, function(err, numRemoved) {
    if (err) console.error(err)
    else console.log(`${numRemoved} old jobs canceled!`)
  });
  agenda.purge(function(err, numRemoved) {
    if (err) console.error(err)
    else console.log(`${numRemoved} old jobs removed!`)
  });
  agenda.start();
});

app.post('/spaceghost', function(req, res) {
  // var message = req.body.Body;
  var spaceTime = '10'
  var spaceInterval = 'seconds'
  agenda.schedule(`in ${spaceTime} ${spaceInterval}`, 'send text message', 'HELLO I AM GOING TO SPACE');
  agenda.schedule(`in 30 ${spaceInterval}`, 'send text message', 'I\'M AT MARS SEE YA SUCKER');
});

app.listen(2001, function () {
  console.log('Space Ghost listening on port 2001!');
});

module.exports = app;
