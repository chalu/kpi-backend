import express, { Request } from "express";
import { PrismaClient, ApiLog } from "@prisma/client";

import { APICallsKPIResponse } from "../../oas-contract"

import { ApiHandler, respondAs, respondWith } from "../core";

const router = express.Router();
const prisma = new PrismaClient();

const getSandboxAPICalls: ApiHandler<APICallsKPIResponse> = async (reqquest: Request) => {
  let response;
  try {
    const allCalls: ReadonlyArray<ApiLog> = await prisma.apiLog.findMany();
    const payload: APICallsKPIResponse = {
        calls:allCalls.length
    };

    response = respondAs(200, payload);

  } catch (e) {
    console.log(e.message);
    response = e;
  }

  return response;
};

router.get("/", respondWith(getSandboxAPICalls));

export default router;
