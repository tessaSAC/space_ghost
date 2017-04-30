const mongoConnectionString = "mongodb://127.0.0.1:27017/agenda",
      Agenda = require('agenda'),
      agenda = new Agenda({db: {address: mongoConnectionString}}),
      twilio = require('twilio'),
      cfg = require('../config.js'),
      accountSid = cfg.accountSid,
      authToken = cfg.authToken,
      casper = cfg.casper,
      ghostee = cfg.ghostee,
      twilioNumber = cfg.twilioNumber,
      client = twilio(accountSid, authToken);

agenda.define('send text message', function(job) {
  console.log('IM EXECUTING!!!')
    client.sms.messages.create({
        to: ghostee,
        from: twilioNumber,
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

module.exports = agenda;
