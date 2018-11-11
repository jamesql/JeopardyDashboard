const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "JagroshSucks1337",
  database: "jep"
});

const webcon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "JagroshSucks1337",
    database: "jep"
  });

  function createRegUser() {

  }

  function createWebUser() {

  }

module.exports = {
  con, webcon
}