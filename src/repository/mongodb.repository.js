const {Pool} = require('pg');
const {activeMode, dev, prod} = require('../app.config');

const pool = new Pool((() => {
   if (activeMode === 'dev') {
      const {user, password, port, host, dbName} = dev.db;
      return {
         user: user,
         host: host,
         database: dbName,
         password: password,
         port: port,
         max: 20
      }
   } else if (activeMode === 'prod') {
      return {
         connectionString: process.env.DATABASE_URL
      }
   }
})());

module.exports.pool = pool;