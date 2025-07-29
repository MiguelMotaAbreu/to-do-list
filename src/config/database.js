const mysql = require("mysql2");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "taskmanager_db",
    user: "root",
    password: "Miguel010203"
})

module.exports = connection;