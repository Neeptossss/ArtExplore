const mysql = require("mysql2");
const db = require("../config/db.config.js");

const connection = mysql.createConnection({
    host: db.HOST,
    user: db.USER,
    password: db.PASSWORD,
    database: db.DB
});

connection.connect(err => {
    if (err) {
        console.log(`Connection Request Failed ${err.stack}`)
    } else {
        console.log(`DB Connection Successful ${connection.threadId}`)
    }
});
module.exports = connection;