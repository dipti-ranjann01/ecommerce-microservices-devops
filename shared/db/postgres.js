const { Pool } = require("pg");
const Config = require("../config/index");
const pool = new Pool ({
  host: Config.DB_HOST,
  port: Config.DB_PORT,
  user: Config.DB_USER,
  password: Config.DB_PASSWORD,
  database: Config.DB_NAME,
});

module.exports = pool ; 