module.exports = {
   "type": "mysql",
   "host": process.env.HOST,
   "port": 3306,
   "username": process.env.DB_USER,
   "password": process.env.DB_PASSWORD,
   "database": process.env.DB_NAME,
   "logging": true,
   "entities": [
      "dist/entity/*.js"
   ],
   "migrations": [
      "dist/migration/*.js"
   ],
   "subscribers": [
      "dist/subscriber/*.js"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
