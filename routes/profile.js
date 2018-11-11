const express = require('express');
const router = express.Router();
const con = require('../functions/sql');
const user = require('../functions/user');

router.get('/:id', async (req, res, next) => {
    con.connect(function(err) {
        const data = con.query("SELECT * FROM level WHERE userid='" + req.params.id + "'", function (err, result, fields) {
            const level = result[0].level;
            const correct = result[0].correct;
            const loss = result[0].lose;
            const ties = result[0].tie;
            const gotId = result[0].userid;
            const wins = result[0].wins;
    res.render('profile', { title: 'Profile', level, correct, loss, ties, gotId, wins, user: req.user});
        });
    });
});

module.exports = router;