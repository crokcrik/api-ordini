const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    posrt: 5432,
    user: "admin", 
    password: "admin", 
    database: "negozio",
});

module.exports = pool; 

