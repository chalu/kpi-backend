import { Request, RequestHandler, Response } from "express";

interface IResponse {
  readonly kind: number;
  readonly apply: (res: Response) => void;
}

interface IResponseJson<P> extends IResponse {
  payload: P;
}

export type ApiHandler<V> = (req: Request) => Promise<IResponseJson<V>>;

export function respondWith<V>(handler: ApiHandler<V>): RequestHandler {
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

export function respondAs<P>(kind: number, payload: P): IResponseJson<P> {
  return {
    kind,
    payload,
    apply(res) {
      res.status(this.kind).json(this.payload)
    }
  };
}

export function errAs<E>(payload: E | IResponseJson<E>): IResponseJson<E> {
  // Do we have a IResponse? Just pass it on!
  if ('kind' in payload) return payload;

  return {
    kind: 500,
    payload,
    apply(res) {
      res.status(this.kind).json({
        message: "Unable to complete your request due to an unexpected server error"
      });
    }
  };
}
