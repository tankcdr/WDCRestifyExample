'use strict'

var wdc = require('watson-developer-cloud-alpha'),
    restify = require('restify'),
    server = restify.createServer(),
    question_and_answer_travel = wdc.question_and_answer({
	username: '[user name]',
        password: '[password]',
        version: 'v1',
        dataset: 'travel'
    }) 

server.use(restify.fullResponse())
      .use(restify.bodyParser())

server.post('/travel/ask', function(req,res,next) {
	var options = {
		text: req.params.question
	}
	question_and_answer_travel.ask(options, function (err, response) {
		if (err)
			res.send(500,err)
	        else 
			res.send(200,response)

		return res.next();
	})
})

server.listen(8080,function() {
	console.log('Travel service listening on '+server.url)
})

