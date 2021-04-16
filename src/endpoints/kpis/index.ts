import express from "express";
import APICallsRouter from './api-calls';
import APIDownloadsRouter from './api-downloads';

const router = express.Router();

// Mount the endpoint controllers
router.use('/sandbox-api-calls', APICallsRouter);
router.use('/sandbox-api-downloads', APIDownloadsRouter);

export default router;