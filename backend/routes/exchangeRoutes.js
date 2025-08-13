import express from 'express';
import { getExchangeInfo } from '../controllers/exchangeController.js';

const router = express.Router();

// Route to get MEXC exchange info
router.get('/exchangeInfo', getExchangeInfo);

export default router;
