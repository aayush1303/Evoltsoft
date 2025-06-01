import express from 'express';
import {
  createStation,
  getAllStations,
  updateStation,
  deleteStation
} from '../controllers/stationController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createStation);
router.get('/', authMiddleware, getAllStations);
router.put('/:id', authMiddleware, updateStation);
router.delete('/:id', authMiddleware, deleteStation);

export default router;
