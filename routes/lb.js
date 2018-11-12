const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('lb', { title: 'Leaderboard', user: req.user })
});

module.exports = router;