import { Historical } from '../models/historical.model';
import mysqlConn from '../database/database-MySQL';

export class HistoricalController {
  static async insertCostosTramo(data: {
    Linea: string;
    Fecha: string;
    Residencial: number;
    Comercial: number;
    Industrial: number;
  }): Promise<void> {
    const query = `
        INSERT INTO costos_tramo (Linea, Fecha, Residencial, Comercial, Industrial)
        VALUES (?, ?, ?, ?, ?);
    `;

    return new Promise((resolve, reject) => {
      mysqlConn.query(
        query,
        [
          data.Linea,
          data.Fecha,
          data.Residencial,
          data.Comercial,
          data.Industrial,
        ],
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve();
        }
      );
    });
  }

  static async insertPerdidasTramo(data: {
    Linea: string;
    Fecha: string;
    Residencial: number;
    Comercial: number;
    Industrial: number;
  }): Promise<void> {
    const query = `
        INSERT INTO perdidas_tramo (Linea, Fecha, Residencial, Comercial, Industrial)
        VALUES (?, ?, ?, ?, ?);
    `;

    return new Promise((resolve, reject) => {
      mysqlConn.query(
        query,
        [
          data.Linea,
          data.Fecha,
          data.Residencial,
          data.Comercial,
          data.Industrial,
        ],
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve();
        }
      );
    });
  }

  static async insertConsumoTramo(data: {
    Linea: string;
    Fecha: string;
    Residencial: number;
    Comercial: number;
    Industrial: number;
  }): Promise<void> {
    const query = `
        INSERT INTO consumo_tramo (Linea, Fecha, Residencial, Comercial, Industrial)
        VALUES (?, ?, ?, ?, ?);
    `;

    return new Promise((resolve, reject) => {
      mysqlConn.query(
        query,
        [
          data.Linea,
          data.Fecha,
          data.Residencial,
          data.Comercial,
          data.Industrial,
        ],
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve();
        }
      );
    });
  }

  static async getAllHistTramos(): Promise<Historical[]> {
    const consultaTramos = `
    SELECT c.Linea, 
           SUM(c.Residencial + c.Comercial + c.Industrial) AS consumo, 
           SUM(p.Residencial + p.Comercial + p.Industrial) AS perdidas, 
           SUM(co.Residencial + co.Comercial + co.Industrial) AS costo 
    FROM consumo_tramo c 
    JOIN costos_tramo co ON c.Fecha = co.Fecha AND c.Linea = co.Linea 
    JOIN perdidas_tramo p ON c.Fecha = p.Fecha AND c.Linea = p.Linea 
    GROUP BY c.Linea 
    ORDER BY c.Linea;
  `;

    return new Promise((resolve, reject) => {
      mysqlConn.query(consultaTramos, (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results as Historical[]);
      });
    });
  }

  static async getAllHistCliente(): Promise<Historical[]> {
    const consultaCliente = `
    SELECT c.Linea, 
           SUM(c.Residencial) AS consumo_residencial, 
           SUM(c.Comercial) AS consumo_comercial, 
           SUM(c.Industrial) AS consumo_industrial, 
           SUM(p.Residencial) AS perdidas_residencial, 
           SUM(p.Comercial) AS perdidas_comercial, 
           SUM(p.Industrial) AS perdidas_industrial, 
           SUM(co.Residencial) AS costo_residencial, 
           SUM(co.Comercial) AS costo_comercial, 
           SUM(co.Industrial) AS costo_industrial 
    FROM consumo_tramo c 
    JOIN costos_tramo co ON c.Fecha = co.Fecha AND c.Linea = co.Linea 
    JOIN perdidas_tramo p ON c.Fecha = p.Fecha AND c.Linea = p.Linea 
    GROUP BY c.Linea 
    ORDER BY c.Linea;
  `;

    return new Promise((resolve, reject) => {
      mysqlConn.query(consultaCliente, (err, results) => {
        if (err) {
          reject(err);
        }
        console.log('results in promise of clients', results);

        resolve(results as Historical[]);
      });
    });
  }
  static async getHistTramos(data: {
    fechainicial: string;
    fechafinal: string;
  }): Promise<Historical[]> {
    const consultaTramos = `
      SELECT c.Linea, SUM(c.Residencial + c.Comercial + c.Industrial) AS consumo, 
             SUM(p.Residencial + p.Comercial + p.Industrial) AS perdidas, 
             SUM(co.Residencial + co.Comercial + co.Industrial) AS costo 
      FROM consumo_tramo c 
      JOIN costos_tramo co ON c.Fecha = co.Fecha AND c.Linea = co.Linea 
      JOIN perdidas_tramo p ON c.Fecha = p.Fecha AND c.Linea = p.Linea 
      WHERE c.Fecha BETWEEN ? AND ? 
      GROUP BY c.Linea 
      ORDER BY c.Linea;
    `;

    return new Promise((resolve, reject) => {
      mysqlConn.query(
        consultaTramos,
        [data.fechainicial, data.fechafinal],
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results as Historical[]);
        }
      );
    });
  }

  static async getHistCliente(data: {
    fechainicial: string;
    fechafinal: string;
  }): Promise<Historical[]> {
    const consultaCliente = `
      SELECT c.Linea, SUM(c.Residencial) AS consumo_residencial, 
             SUM(c.Comercial) AS consumo_comercial, 
             SUM(c.Industrial) AS consumo_industrial, 
             SUM(p.Residencial) AS perdidas_residencial, 
             SUM(p.Comercial) AS perdidas_comercial, 
             SUM(p.Industrial) AS perdidas_industrial, 
             SUM(co.Residencial) AS costo_residencial, 
             SUM(co.Comercial) AS costo_comercial, 
             SUM(co.Industrial) AS costo_industrial 
      FROM consumo_tramo c 
      JOIN costos_tramo co ON c.Fecha = co.Fecha AND c.Linea = co.Linea 
      JOIN perdidas_tramo p ON c.Fecha = p.Fecha AND c.Linea = p.Linea 
      WHERE c.Fecha BETWEEN ? AND ? 
      GROUP BY c.Linea 
      ORDER BY c.Linea;
    `;

    return new Promise((resolve, reject) => {
      mysqlConn.query(
        consultaCliente,
        [data.fechainicial, data.fechafinal],
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results as Historical[]);
        }
      );
    });
  }

  static async getAllTramosCliente(): Promise<Historical[]> {
    const consultaTramosCliente = `
    SELECT TipoConsumo, Linea, Perdidas 
    FROM ( 
      SELECT "Residencial" AS TipoConsumo, pt.Linea, pt.Residencial AS Perdidas 
      FROM perdidas_tramo pt 
      UNION ALL 
      SELECT "Comercial" AS TipoConsumo, pt.Linea, pt.Comercial AS Perdidas 
      FROM perdidas_tramo pt 
      UNION ALL 
      SELECT "Industrial" AS TipoConsumo, pt.Linea, pt.Industrial AS Perdidas 
      FROM perdidas_tramo pt 
    ) AS combined_data 
    ORDER BY TipoConsumo, Perdidas DESC 
    LIMIT 20;
  `;

    return new Promise((resolve, reject) => {
      mysqlConn.query(consultaTramosCliente, (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results as Historical[]);
      });
    });
  }
  static async getTramosCliente(data: {
    fechainicial: string;
    fechafinal: string;
  }): Promise<Historical[]> {
    const consultaTramosCliente = `
      SELECT TipoConsumo, Linea, Perdidas 
      FROM ( 
        SELECT "Residencial" AS TipoConsumo, pt.Linea, pt.Residencial AS Perdidas 
        FROM perdidas_tramo pt 
        WHERE pt.Fecha BETWEEN ? AND ? 
        UNION ALL 
        SELECT "Comercial" AS TipoConsumo, pt.Linea, pt.Comercial AS Perdidas 
        FROM perdidas_tramo pt 
        WHERE pt.Fecha BETWEEN ? AND ? 
        UNION ALL 
        SELECT "Industrial" AS TipoConsumo, pt.Linea, pt.Industrial AS Perdidas 
        FROM perdidas_tramo pt 
        WHERE pt.Fecha BETWEEN ? AND ? 
      ) AS combined_data 
      ORDER BY TipoConsumo, Perdidas DESC 
      LIMIT 20;
    `;

    return new Promise((resolve, reject) => {
      mysqlConn.query(
        consultaTramosCliente,
        [
          data.fechainicial,
          data.fechafinal,
          data.fechainicial,
          data.fechafinal,
          data.fechainicial,
          data.fechafinal,
        ],
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results as Historical[]);
        }
      );
    });
  }
}
