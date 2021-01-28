module.exports = {
  PORT: process.env.PORT,
  HOST: 'localhost',
  DB: {
    username: 'postgres',
    password: 'secret',
    database: 'training_dev',
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  },
};
