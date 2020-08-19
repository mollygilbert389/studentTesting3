// Connection to mysql database and JAWSDB
var mysql = require("mysql");
var connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "rnr56s6e2uk326pj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        port: 3306,
        user: "tad1j9j25jw5qrel",
        password: "kxnrz4ry5hkc8kvw",
        database: "lxfszzg6vw1en0t9",
    });
}
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

connection.connect();
module.exports = connection;

