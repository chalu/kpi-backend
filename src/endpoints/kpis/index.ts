import express from "express";

import MembersRouter from './members';
import APICallsRouter from './api-calls';
import APICallersRouter from './api-callers';
import APIDownloadsRouter from './api-downloads';
import SandboxUsersRouter from './sandbox-users';
import APIDownloadersRouter from './api-downloaders';

const router = express.Router();

// Mount the endpoint controllers
router.use('/members', MembersRouter);
router.use('/api-calls', APICallsRouter);
router.use('/api-callers', APICallersRouter);
router.use('/api-downloads', APIDownloadsRouter);
router.use('/sandbox-users', SandboxUsersRouter);
router.use('/api-downloaders', APIDownloadersRouter);

export default router;