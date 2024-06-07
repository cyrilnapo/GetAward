const mysql = require('mysql2');
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'db_GetAward',
  port: 6033
};
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;
