const express = require('express');
const router = express.Router();
const con = require('../functions/sql');
const user = require('../functions/user');


router.get('/:id', async (req, res, next) => {
    con.connect(function(err) {
        const checker = con.query("SELECT COUNT(*) AS total FROM webuser WHERE userid = '" + req.params.id + "'", function (err, rez, fields) {
            if (rez[0].total == 1) {
                const data = con.query("SELECT * FROM level WHERE userid='" + req.params.id + "'", function (err, result, fields) {
                    const level = result[0].level;
                    const correct = result[0].correct;
                    const loss = result[0].lose;
                    const ties = result[0].tie;
                    const gotId = result[0].userid;
                    const wins = result[0].wins;
                const uuid = con.query("SELECT * FROM webuser WHERE userid='" + req.params.id + "'", function (err, result2, fields) {
            res.render('profile', { title: 'Profile', level, correct, loss, ties, gotId, wins, user: req.user, result2});
                        });
                    });
            } else {
            res.send("This user does not exsist. Please tell them to log into the website.")
            };
        });
    });
});

module.exports = router;