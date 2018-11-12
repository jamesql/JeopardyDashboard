const express = require('express');
const router = express.Router();
const passport = require('passport');
const session  = require('cookie-session');
const Strategy = require('passport-discord').Strategy
const settings = require('../settings.json');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const con = require('../functions/sql');

passport.use(new Strategy({
    clientID: settings.clientID,
    clientSecret: settings.clientSecret,
    callbackURL: settings.callbackURL,
    scope: ['identify']
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', passport.authenticate('discord'));

router.get('/login', (req, res, next) => {
    res.redirect('/auth/');
});

router.get('/info', (req, res, next) => {
    res.json(req.user)
});

router.get('/callback', passport.authenticate('discord', {
}), (req, res, next) => { 
    con.connect(function(err) {
        const data = con.query("SELECT COUNT(*) AS total FROM level WHERE userid='" + req.user.id + "'", function (err, result, fields) {
            console.log(result);
            if (result[0].total > 0) {
            console.log("exists");
            //  check if they are in web then input/upd
            con.connect(function(err) {
                const data = con.query("SELECT COUNT(*) AS total FROM webuser WHERE userid='" + req.user.id + "'", function (err, result, fields) {
                    if (result[0].total > 0) {
                        // upd
                    }else{
                        con.connect(function(err) { 
                            const data = con.query("INSERT INTO webuser (userid,username,discrim,avi,description) VALUES ('" + req.user.id + "','" + req.user.username + "','" + req.user.discriminator + "','" + req.user.avatar + "','" + "')", function (err, result, fields) {
                            });
                        });
                    }
                });
            });
        }else{
            con.connect(function(err) { 
                const data = con.query("INSERT INTO level (level,correct,userid,wins,lose,tie) VALUES (0,0," + req.user.id + ",0,0,0)", function (err, result, fields) {
                });
            });
            con.connect(function(err) { 
                const data = con.query("INSERT INTO webuser (userid,username,discrim,avi,description) VALUES ('" + req.user.id + "','" + req.user.username + "','" + req.user.discriminator + "','" + req.user.avatar + "','" + "')", function (err, result, fields) {
                });
            });
        }
        });
    });
     res.redirect('/profile/' + req.user.id)
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})



module.exports = router;