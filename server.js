const http = require('http'),
	  express = require('express'),
	  app = express(),
      session = require('express-session'),
	  twilio = require('twilio'),
	  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'nyan-cat-loves-space' }));

app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.post('/', function(req, res) {
    let smsCount = req.session.counter || 0;
    const twiml = new twilio.TwimlResponse();
    if (req.body.Body == 'hello') {
        twiml.message('Hi!');
    } else if(req.body.Body == 'bye') {
        twiml.message('Goodbye');
    } else {
        twiml.message('No Body param match, Twilio sends this in the request to your server.');
    }
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

app.listen(2001, function () {
  console.log('Example app listening on port 2001!');
})
