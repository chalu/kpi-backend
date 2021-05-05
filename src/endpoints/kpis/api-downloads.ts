import express, { Request } from "express";

import DB, { QUERIES } from '../../data/db';
import { KPIFigureResponse } from "../../oas-contract"
import { ApiHandler, respondAs, respondWith, errAs } from "../core";

const router = express.Router();

const getAPIDownloads: ApiHandler<KPIFigureResponse> = async (request: Request) => {
  let response;
  const { fromRange, toRange } = request.query;
  const toDate = new Date(parseInt(`${toRange}`, 10))
  const fromDate = new Date(parseInt(`${fromRange}`, 10));

  try {
    const result = await DB.query(QUERIES.apiDownloads(), [fromDate, toDate]);
    const payload: KPIFigureResponse = {
        outcome:result.rowCount
    };

    response = respondAs(200, payload);

  } catch (e) {
    response = errAs(e);
  }

  return response;
};

const getAPIDownloaders: ApiHandler<KPIFigureResponse> = async (request: Request) => {
  let response;
  const { fromRange, toRange } = request.query;
  const toDate = new Date(parseInt(`${toRange}`, 10))
  const fromDate = new Date(parseInt(`${fromRange}`, 10));

  try {
    const result = await DB.query(QUERIES.apiDownloaders(), [fromDate, toDate]);
    const payload: KPIFigureResponse = {
      outcome:result.rowCount
    };

    response = respondAs(200, payload);

  } catch (e) {
    response = errAs(e);
  }

  return response;
};

router.get("/range", respondWith(getAPIDownloads));
router.get("/downloaders/range", respondWith(getAPIDownloaders));

export default router;
