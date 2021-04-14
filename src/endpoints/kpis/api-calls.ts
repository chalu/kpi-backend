import express, { Request } from "express";
import { PrismaClient, ApiLog } from "@prisma/client";

import { APICallsKPIResponse } from "../../oas-contract"

import { ApiHandler, respondAs, respondWith, errAs } from "../core";

const router = express.Router();
const prisma = new PrismaClient();

const getSandboxAPICalls: ApiHandler<APICallsKPIResponse> = async (request: Request) => {
  let response;
  const { fromDate, toDate } = request.body;

  const query = {
    where: {
      AND: [{
        added_at: {
          gte: new Date(parseInt(fromDate, 10))
        }
      }, {
        added_at: {
          lte: new Date(parseInt(toDate, 10))
        }
      }]
    }
  }

  try {
    const allCalls: ReadonlyArray<ApiLog> = await prisma.apiLog.findMany(query);

    const payload: APICallsKPIResponse = {
        calls:allCalls.length
    };

    response = respondAs(200, payload);

  } catch (e) {
    response = errAs(e);
  }

  return response;
};

router.get("/", respondWith(getSandboxAPICalls));

export default router;
