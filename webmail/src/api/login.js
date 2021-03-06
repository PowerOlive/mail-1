
const app = require("../app");


const doLogin = require("../promise/login");
const token = require("../token");

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

app.post('/api/login', jsonParser, function(req, res){

	if (!req.body.username || !req.body.password){
		res.status(500).end()
		return;
	}

	doLogin(req.body.username, req.body.password)
	.then(result => {
		var t = token.sign({
			username: req.body.username
		});

		res.json({
			success: result.success,
			token: t
		});
	})
	.catch(e => {
		res.status(500).end();
	});


});

