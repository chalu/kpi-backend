import express, { Request } from "express";
import { APICallsKPIResponse } from "../../oas-contract"
 
import { ApiHandler, respondAs, respondWith } from "../core";

const router = express.Router();

const getSandboxAPICalls: ApiHandler<APICallsKPIResponse> = async (req: Request) => {
  let response;
  try {

    const payload: APICallsKPIResponse = {
        calls:604
    };

    response = respondAs(200, payload);

  } catch (e) {
    response = e;
  }

  return response;
};

router.get("/", respondWith(getSandboxAPICalls));

export default router;
