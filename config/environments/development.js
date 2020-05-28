module.exports = {
  PORT: process.env.PORT,
  DB: {
    username: 'postgres',
    password: 'secret',
    database: 'training_dev',
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  },
};
