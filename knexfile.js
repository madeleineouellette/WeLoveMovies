const path = require("path");

require("dotenv").config();

const {
  DATABASE_URL = "postgres://lmwvlvuo:lxfmnFM58AS-1AagskORi-SPBrcXfJUh@raja.db.elephantsql.com/lmwvlvuo",
  TEST_DATABASE_URL = "postgres://iuefmpep:bQ7aqAWxjJ_oAnOlxzW3jJixzOExtDui@raja.db.elephantsql.com/iuefmpep"
} = process.env;

//copy entire knexfile from qualified 

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "postgresql",
    connection:  TEST_DATABASE_URL,
      pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },
};
