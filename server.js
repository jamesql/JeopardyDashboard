const express = require('express')
var mysql = require('mysql');
const app = express()

var gid = "0";

var level;
var correct;
var wins;
var loss;
var ties;
var gotId;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "JagroshSucks1337",
  database: "jep"
});

function getStats(userid) {
  con.connect(function(err) {
    con.query("SELECT * FROM level WHERE userid='" + userid + "'", function (err, result, fields) {
    console.log(result);
  	level = result[0].level;
  	correct = result[0].correct;
  	wins = result[0].wins;
  	loss = result[0].lose;
  	ties = result[0].tie;
  	gotId = result[0].userid;
    });
  });
}

function inputUser(userid) {

}

app.get('/', function (req, res) {
  res.send('<style>#userfield {background-color: #7289DA;border: none;position: absolute;top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 3px; cursor: pointer; font-size: 15px; padding: 15px 25px; font-weight: bold; text-transform: uppercase; color: #FFF !important; }#login {background-color: #7289DA;border: none;position: absolute;top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 3px; cursor: pointer; font-size: 15px; padding: 15px 25px; font-weight: bold; text-transform: uppercase; color: #FFF !important; }</style><title>Jeopardy! - Home</title><form>User ID:<br><input id="useridf" type="text" name="useridf"><br><button id="login">login</button>')
})

app.get('/auth', function (req, res) {
  res.send("<title>Jeopardy - Logging in...</title>");
})

app.get('/loggedin', function (req, res) {
  getStats("207335289650151426");
  res.send('Stats for USERID : '  + gotId + " : \n" + "Level : " + level + "\n" + "Correct : " + correct + "\n" + "Wins : " + wins + "\n Losses : " + loss + "\n Ties : " + ties)
})

app.listen(80, function () {
  console.log('Server Started!')
})
