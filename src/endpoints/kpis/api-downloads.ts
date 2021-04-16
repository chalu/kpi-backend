import express, { Request } from "express";
import { PrismaClient } from "@prisma/client";

import { APIsUseResponse } from "../../oas-contract"

import { ApiHandler, respondAs, respondWith, errAs } from "../core";

const router = express.Router();
const prisma = new PrismaClient();

const getSandboxAPIDownloads: ApiHandler<APIsUseResponse> = async (request: Request) => {
  let response;
  const { fromDate, toDate } = request.body;

  const query = {
    where: {
      AND: [{
        accessed_at: {
          gte: new Date(parseInt(fromDate, 10))
        }
      }, {
        accessed_at: {
          lte: new Date(parseInt(toDate, 10))
        }
      }]
    }
  }

  try {
    const downloadsCount = await prisma.documentLog.count(query);
    const payload: APIsUseResponse = {
        calls:downloadsCount
    };

    response = respondAs(200, payload);

  } catch (e) {
    response = errAs(e);
  }

  return response;
};

router.get("/", respondWith(getSandboxAPIDownloads));

export default router;
