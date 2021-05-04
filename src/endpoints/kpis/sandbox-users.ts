import express, { Request } from "express";

import DB, { QUERIES } from '../../data/db';
import { KPIFigureResponse } from "../../oas-contract"
import { ApiHandler, respondAs, respondWith, errAs } from "../core";

const router = express.Router();

const getSandboxUsers: ApiHandler<KPIFigureResponse> = async (request: Request) => {
  let response;
  const { fromRange, toRange, mode } = request.query;
  const toDate = new Date(parseInt(`${toRange}`, 10))
  const fromDate = new Date(parseInt(`${fromRange}`, 10));

  try {
    const result = await DB.query(QUERIES.sandboxUsers(`${mode}`), [fromDate, toDate]);
    const payload: KPIFigureResponse = {
      outcome:result.rowCount
    };

    response = respondAs(200, payload);

  } catch (e) {
    response = errAs(e);
  }

  return response;
};

router.get("/range", respondWith(getSandboxUsers));

export default router;
