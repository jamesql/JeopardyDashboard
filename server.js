const express = require('express')
var mysql = require('mysql');
const app = express()

var userid = "207335289650151426";
var level;
var correct;
var wins;
var loss;
var ties;
var gotId;

var con = mysql.createConnection({
  host: "///",
  user: "root",
  password: "///",
  database: "///"
});

app.get('/', function (req, res) {
  res.send('<title>Jeopardy! - Home</title>')
})

app.get('/loggedin', function (req, res) {
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM level WHERE userid='" + userid + "'", function (err, result, fields) {
      if (err) throw err;
  	level = result[0].level;
  	correct = result[0].correct;
  	wins = result[0].wins;
  	loss = result[0].lose;
  	ties = result[0].tie;
  	gotId = result[0].userid;
    });
  });
  res.send('Stats for USERID : '  + gotId + " : \n" + "Level : " + level + "\n" + "Correct : " + correct + "\n" + "Wins : " + wins + "\n Losses : " + loss + "\n Ties : " + ties)
})

app.listen(8080, function () {
  console.log('Server Started!')
})
