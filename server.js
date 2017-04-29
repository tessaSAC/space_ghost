const http = require('http'),
	  express = require('express'),
	  app = express(),
	  twilio = require('twilio'),
	  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.post('/', function(req, res) {
    const twiml = new twilio.TwimlResponse();
    if (req.body.Body == 'hello') {
        twiml.message('Hi!');
    } else if(req.body.Body == 'bye') {
        twiml.message('bye');
    } else {
		twiml.message(function() {
			this.body(req.body.Body);
		});
    }
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

app.listen(2001, function () {
  console.log('Example app listening on port 2001!');
})
