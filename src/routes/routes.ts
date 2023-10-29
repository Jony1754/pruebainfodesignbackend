import express from 'express';
import { HistoricalController } from '../controllers/historical.controller';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 200,
  });
});

router.post('/insert-perdidas-tramo', async (req, res) => {
  try {
    await HistoricalController.insertPerdidasTramo(req.body);
    res.status(201).json({ message: 'Datos insertados correctamente.' });
  } catch (err) {
    res.status(500).json({ message: 'Error al insertar datos', error: err });
  }
});

router.post('/insert-costos-tramo', async (req, res) => {
  try {
    await HistoricalController.insertCostosTramo(req.body);
    res.status(201).json({ message: 'Datos insertados correctamente.' });
  } catch (err) {
    res.status(500).json({ message: 'Error al insertar datos', error: err });
  }
});

router.post('/insert-consumo-tramo', async (req, res) => {
  try {
    await HistoricalController.insertConsumoTramo(req.body);
    res.status(201).json({ message: 'Datos insertados correctamente.' });
  } catch (err) {
    res.status(500).json({ message: 'Error al insertar datos', error: err });
  }
});

router.get('/tramos/all', async (req, res) => {
  try {
    const results = await HistoricalController.getAllHistTramos();
    if (results.length === 0) {
      res.status(404).json({ message: 'No se encontraron resultados' });
    } else {
      res.json(results);
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error al obtener todos los datos de tramos',
      error: err,
    });
  }
});

router.get('/cliente/all', async (req, res) => {
  try {
    const results = await HistoricalController.getAllHistCliente();
    if (results.length === 0) {
      res.status(404).json({ message: 'No se encontraron resultados' });
    } else {
      res.json(results);
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error al obtener todos los datos del cliente',
      error: err,
    });
  }
});

router.get('/tramos-cliente/all', async (req, res) => {
  try {
    const results = await HistoricalController.getAllTramosCliente();
    if (results.length === 0) {
      res.status(404).json({ message: 'No se encontraron resultados' });
    } else {
      res.json(results);
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error al obtener todos los datos de tramos-cliente',
      error: err,
    });
  }
});

router.get('/tramos', async (req, res) => {
  try {
    const { fechainicial, fechafinal } = req.query;
    if (
      typeof fechainicial !== 'string' ||
      typeof fechafinal !== 'string' ||
      !fechainicial ||
      !fechafinal
    ) {
      res
        .status(400)
        .json({ message: 'Las fechas inicial y final son requeridas' });
      return;
    }
    const results = await HistoricalController.getHistTramos({
      fechainicial,
      fechafinal,
    });
    if (results.length === 0) {
      res.status(404).json({ message: 'No se encontraron resultados' });
    } else {
      res.json(results);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error al obtener datos de tramos', error: err });
  }
});

router.get('/cliente', async (req, res) => {
  try {
    const { fechainicial, fechafinal } = req.query;
    if (
      typeof fechainicial !== 'string' ||
      typeof fechafinal !== 'string' ||
      !fechainicial ||
      !fechafinal
    ) {
      res
        .status(400)
        .json({ message: 'Las fechas inicial y final son requeridas' });
      return;
    }
    const results = await HistoricalController.getHistCliente({
      fechainicial,
      fechafinal,
    });
    if (results.length === 0) {
      res.status(404).json({ message: 'No se encontraron resultados' });
    } else {
      res.json(results);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error al obtener datos del cliente', error: err });
  }
});

router.get('/tramos-cliente', async (req, res) => {
  try {
    const { fechainicial, fechafinal } = req.query;
    if (
      typeof fechainicial !== 'string' ||
      typeof fechafinal !== 'string' ||
      !fechainicial ||
      !fechafinal
    ) {
      res
        .status(400)
        .json({ message: 'Las fechas inicial y final son requeridas' });
      return;
    }
    const results = await HistoricalController.getTramosCliente({
      fechainicial,
      fechafinal,
    });
    if (results.length === 0) {
      res.status(404).json({ message: 'No se encontraron resultados' });
    } else {
      res.json(results);
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error al obtener datos de tramos-cliente',
      error: err,
    });
  }
});

export default router;
