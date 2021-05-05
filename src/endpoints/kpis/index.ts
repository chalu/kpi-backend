import express from "express";

import MembersRouter from './members';
import APICallsRouter from './api-calls';
import APIDownloadsRouter from './api-downloads';
import SandboxUsersRouter from './sandbox-users';

const router = express.Router();

// Mount the endpoint controllers
router.use('/members', MembersRouter);
router.use('/api-calls', APICallsRouter);
router.use('/api-downloads', APIDownloadsRouter);
router.use('/sandbox-users', SandboxUsersRouter);

export default router;