import express, { Request } from "express";

import DB, { QUERIES } from '../../data/db';
import { KPIDataResponse, KPIFigureResponse } from "../../oas-contract"
import { ApiHandler, respondAs, respondWith, errAs } from "../core";

const router = express.Router();

const getAPICalls: ApiHandler<KPIFigureResponse> = async (request: Request) => {
  let response;
  const { fromRange, toRange } = request.query;
  const toDate = new Date(parseInt(`${toRange}`, 10))
  const fromDate = new Date(parseInt(`${fromRange}`, 10));

  try {
    const result = await DB.query(QUERIES.apiCalls(), [fromDate, toDate]);
    const payload: KPIFigureResponse = {
      outcome:result.rowCount
    };

    response = respondAs(200, payload);

  } catch (e) {
    response = errAs(e);
  }

  return response;
};

const getAPICallers: ApiHandler<KPIFigureResponse> = async (request: Request) => {
  let response;
  const { fromRange, toRange } = request.query;
  const toDate = new Date(parseInt(`${toRange}`, 10))
  const fromDate = new Date(parseInt(`${fromRange}`, 10));

  try {
    const result = await DB.query(QUERIES.apiCallers(), [fromDate, toDate]);
    const payload: KPIFigureResponse = {
      outcome:result.rowCount
    };

    response = respondAs(200, payload);

  } catch (e) {
    response = errAs(e);
  }

  return response;
};

const getAPICallIntensity: ApiHandler<KPIDataResponse> = async (request: Request) => {
  let response;
  const { fromRange, toRange } = request.query;
  const { tsmeasure } = request.params;
  const toDate = new Date(parseInt(`${toRange}`, 10))
  const fromDate = new Date(parseInt(`${fromRange}`, 10));

  try {
    const result = await DB.query(QUERIES.apiCallsIntensity(tsmeasure), [fromDate, toDate]);
    const payload: KPIDataResponse = {
      data: result.rows
    };

    response = respondAs(200, payload);

  } catch (e) {
    response = errAs(e);
  }

  return response;
};

const getAPICallStatus: ApiHandler<KPIDataResponse> = async (request: Request) => {
  let response;
  const { fromRange, toRange } = request.query;
  const toDate = new Date(parseInt(`${toRange}`, 10))
  const fromDate = new Date(parseInt(`${fromRange}`, 10));

  try {
    const result = await DB.query(QUERIES.apiCallsStatus(), [fromDate, toDate]);
    const payload: KPIDataResponse = {
      data: result.rows
    };

    response = respondAs(200, payload);

  } catch (e) {
    response = errAs(e);
  }

  return response;
};

router.get("/range", respondWith(getAPICalls));
router.get("/status/range", respondWith(getAPICallStatus));
router.get("/callers/range", respondWith(getAPICallers));
router.get("/intensity/:tsmeasure/range", respondWith(getAPICallIntensity));

export default router;
