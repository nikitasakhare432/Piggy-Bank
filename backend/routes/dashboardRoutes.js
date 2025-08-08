import express from 'express';

const { getDashboardData } = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.get('/', authMiddleware, getDashboardData);

export default router;
