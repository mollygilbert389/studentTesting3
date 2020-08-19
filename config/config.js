require("dotenv").config();

module.exports = {

  development: {
    username: "tad1j9j25jw5qrel",
    password: process.env.DB_PASS,
    database: "lxfszzg6vw1en0t9",
    host: "rnr56s6e2uk326pj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    dialect: "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect":  "mysql"
  }
};