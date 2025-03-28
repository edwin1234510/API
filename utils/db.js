import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: "localhost",
  user: "edwin_villabona2894667",
  password: "aprendiz2025",
  database: "node_adso2894667"
});

export default connection;