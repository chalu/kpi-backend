import express from "express";
import KPIsRouter from './kpis/';

const router = express.Router();

// Mount the endpoint controllers
router.use('/kpis', KPIsRouter);

export default router;