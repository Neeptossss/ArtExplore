const mysql = require("mysql2");
const db = require("../config/db.config.js");

const connection = mysql.createConnection({
    host: db.HOST || "localhost",
    user: db.USER || "root",
    password: db.PASSWORD || "artexplore",
    database: db.DB || "artexplore"
});

console.log(`Connecting to ${db.HOST} as ${db.USER}...`);

connection.connect(err => {
    if (err) {
        console.log(`Connection Request Failed ${err.stack}`)
    } else {
        console.log(`DB Connection Successful ${connection.threadId}`)
    }
});
module.exports = connection;