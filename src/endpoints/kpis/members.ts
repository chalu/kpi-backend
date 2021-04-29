import express, { Request } from "express";

import DB, { QUERIES } from '../../data/db';
import { KPIResponse } from "../../oas-contract"
import { ApiHandler, respondAs, respondWith, errAs } from "../core";

const router = express.Router();

const getSandboxMembers: ApiHandler<KPIResponse> = async (request: Request) => {
  let response;
  const { fromRange, toRange } = request.query;
  const toDate = new Date(parseInt(`${toRange}`, 10))
  const fromDate = new Date(parseInt(`${fromRange}`, 10));

  try {
    const result = await DB.query(QUERIES.getMembers(), [fromDate, toDate]);
    const payload: KPIResponse = {
      outcome:result.rowCount
    };

    response = respondAs(200, payload);

  } catch (e) {
    response = errAs(e);
  }

  return response;
};

router.get("/", respondWith(getSandboxMembers));

export default router;
