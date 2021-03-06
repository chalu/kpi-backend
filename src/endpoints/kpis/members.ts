import express, { Request } from "express";

import DB, { QUERIES } from '../../data/db';
import { KPIFigureResponse, KPIDataResponse } from "../../oas-contract"
import { ApiHandler, respondAs, respondWith, errAs } from "../core";

const router = express.Router();

const getMembersInRange: ApiHandler<KPIFigureResponse> = async (request: Request) => {
  let response;
  const { fromRange, toRange } = request.query;
  const toDate = new Date(parseInt(`${toRange}`, 10))
  const fromDate = new Date(parseInt(`${fromRange}`, 10));

  try {
    const result = await DB.query(QUERIES.members(), [fromDate, toDate]);
    const payload: KPIFigureResponse = {
      outcome:result.rowCount
    };

    response = respondAs(200, payload);

  } catch (e) {
    response = errAs(e);
  }

  return response;
};

const getDevelopersInRange: ApiHandler<KPIFigureResponse> = async (request: Request) => {
  let response;
  const { fromRange, toRange } = request.query;
  const toDate = new Date(parseInt(`${toRange}`, 10))
  const fromDate = new Date(parseInt(`${fromRange}`, 10));

  try {
    const result = await DB.query(QUERIES.developers(), [fromDate, toDate]);
    const payload: KPIFigureResponse = {
      outcome:result.rowCount
    };

    response = respondAs(200, payload);

  } catch (e) {
    response = errAs(e);
  }

  return response;
};

const getGenderInRange: ApiHandler<KPIDataResponse> = async (request: Request) => {
  let response;
  const { fromRange, toRange } = request.query;
  const toDate = new Date(parseInt(`${toRange}`, 10))
  const fromDate = new Date(parseInt(`${fromRange}`, 10));

  try {
    const result = await DB.query(QUERIES.memberGenders(), [fromDate, toDate]);
    const mapped = result.rows.reduce((map, {gender: g, count}) => {
      let key = '';
      if (g === 'Male' || g === '{text:Male}' || g === 'm') key = 'Male';
      if (g === 'Female' || g === '{text:Female}' || g === 'f') key = 'Female';
      if (g === 'Others' ) key = 'Others';
      if (g === 'NULL' ) key = 'Not Specified';


      if (!map[key]) map[key] = 0;

      map[key] += parseInt(count, 10);

      return map;
    }, {});

    const payload: KPIDataResponse = {
      data: [mapped]
    };

    response = respondAs(200, payload);
  } catch (e) {
    response = errAs(e);
  }

  return response;
};

const getLocationInRange: ApiHandler<KPIDataResponse> = async (request: Request) => {
  let response;
  const { fromRange, toRange } = request.query;
  const toDate = new Date(parseInt(`${toRange}`, 10))
  const fromDate = new Date(parseInt(`${fromRange}`, 10));

  try {
    const result = await DB.query(QUERIES.memberLocations(), [fromDate, toDate]);
    const mapped = result.rows.reduce((map, {location: loc, count}) => {
      map[loc] = parseInt(count, 10);
      return map;
    }, {});

    const payload: KPIDataResponse = {
      data: [mapped]
    };

    response = respondAs(200, payload);
  } catch (e) {
    response = errAs(e);
  }

  return response;
};

const getAgeInRange: ApiHandler<KPIDataResponse> = async (request: Request) => {
  let response;
  const { fromRange, toRange } = request.query;
  const toDate = new Date(parseInt(`${toRange}`, 10))
  const fromDate = new Date(parseInt(`${fromRange}`, 10));

  try {
    const result = await DB.query(QUERIES.memberAges(), [fromDate, toDate]);
    const mapped = result.rows.reduce((map, {age, count}) => {
      map[age] = parseInt(count, 10);
      return map;
    }, {});

    const payload: KPIDataResponse = {
      data: [mapped]
    };

    response = respondAs(200, payload);
  } catch (e) {
    response = errAs(e);
  }

  return response;
};

router.get("/range", respondWith(getMembersInRange));

router.get("/devs/range", respondWith(getDevelopersInRange));
router.get("/gender/range", respondWith(getGenderInRange));
router.get("/location/range", respondWith(getLocationInRange));
router.get("/age/range", respondWith(getAgeInRange));

export default router;
