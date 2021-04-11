module.exports ={
  "development": {
    "username": "be650e8f40b4cb",
    "password": "30e2c19d",
    "database": "heroku_deeac1ba22c2356",
    "host": "us-cdbr-east-03.cleardb.com",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "Vedavyas9",
    "database": "oslashdb",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "mysql"
  }
}
