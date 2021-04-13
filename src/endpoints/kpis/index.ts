import express from "express";
import APICallsRouter from './api-calls';

const router = express.Router();

// Mount the endpoint controllers
router.use('/sandbox-api-calls', APICallsRouter);

export default router;