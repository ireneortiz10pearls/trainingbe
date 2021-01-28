module.exports = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DB: {
    username: "postgres",
    password: process.env.DB_PASSWORD,
    database: "school_prod",
    host: process.env.DB_HOST,
    dialect: "postgres"
  }
};
