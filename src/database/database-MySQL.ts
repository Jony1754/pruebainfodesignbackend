import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const mysqlConn = mysql.createConnection(process.env.DATABASE_URL!);

if (mysqlConn) {
  mysqlConn.connect((err) => {
    if (err) {
      console.error('ERROR IN CONNECT', err);
      process.exit(1);
    } else {
      console.log('Conexión a DB MYSQL exitosa');
    }
  });
} else {
  console.error('DATABASE_URL is not defined in .env file');
  process.exit(1);
}

// Exportación
export default mysqlConn;
