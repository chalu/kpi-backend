import { Request, RequestHandler, Response } from "express";

interface IResponse {
  readonly kind: number;
  readonly apply: (res: Response) => void;
}

interface IResponseJson<V extends object> extends IResponse {
  value: V;
}

export type ApiHandler<R extends object> = (req: Request) => Promise<IResponseJson<R>>;

export function respondWith<V extends object>(handler: ApiHandler<V>): RequestHandler {
  return (request, response, _) => {
    // pass the Request to the handler
    handler(request).then(
      // if the Promise resolves to an IResponse or gets rejected
      // call it's apply method passing in the Express response object
      (r) => r.apply(response),
      (e) => e.apply(response)
    );
  };
}

export function respondAs<V extends object>(kind: number, value: V): IResponseJson<V> {
  return {
    kind,
    value,
    apply: (res) => res.status(kind).json(value),
  };
}
