const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "JagroshSucks1337",
  database: "jep"
});

module.exports = con