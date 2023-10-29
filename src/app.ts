import express from 'express';
import morgan from 'morgan';
import mysqlConn from './database/database-MySQL';
import routes from './routes/routes';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
app.use(routes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor en puerto ${port}`);
});
