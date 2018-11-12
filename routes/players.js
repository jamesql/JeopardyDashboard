const express = require('express');
const router = express.Router();
const con = require('../functions/sql');


router.get('/', (req, res, next) => {
	con.connect(function(err) {
		const data = con.query("SELECT * FROM webuser", function (err, result, fields) {
			res.render('players', { title: 'Players', user: req.user, result })
		});
	});
});

module.exports = router;
