import { ErrorRequestHandler } from "express";

interface Error {
  type: string;
  message: string;
}

//422
export class UnprocessableError implements Error {
  public type = "error_unprocessable_entity";
  public message: string;

  constructor(error: string) {
    this.message = error;
  }
}

//401
export class MissingHeaderError implements Error {
  public type = "error_unauthorized";
  public message: string;

  constructor(header: string) {
    this.message = header;
  }
}

//404
export class NotFoundError implements Error {
  public type = "error_not_found";
  public message: string;

  constructor(value: string) {
    this.message = `Could not find specified ${value}`;
  }
}

//409
export class ConflictError implements Error {
  public type = "error_conflict";
  public message: string;

  constructor(value: string) {
    this.message = `${value} already exists`;
  }
}

//403
export class AccessDeniedError implements Error {
  public type = "error_access_denied";
  public message: string;

  constructor(value: string) {
    this.message = `Unable to ${value}`;
  }
}

//401
export class UnauthorizedError implements Error {
  public type = "error_unauthorized";
  public message: string;

  constructor(value: string) {
    this.message = `${value} is invalid`;
  }
}

//400
export class BadRequestError implements Error {
  public type = "error_bad_request";
  public message: string;

  constructor(value: string) {
    this.message = value;
  }
}

//406
export class NotAcceptableError implements Error {
  public type = "error_not_acceptable";
  public message: string;

  constructor(value: string) {
    this.message = value;
  }
}

const errorHandler: ErrorRequestHandler = (err: Error, _, res, __) => {
  if (err.type === "error_unprocessable_entity") {
    return res.status(422).json({ message: err.message });
  }

  if (err.type === "error_unauthorized") {
    return res.status(401).json({ message: err.message });
  }

  if (err.type === "error_not_found") {
    return res.status(404).json({ message: err.message });
  }

  if (err.type === "error_conflict") {
    return res.status(409).json({ message: err.message });
  }

  if (err.type === "error_access_denied") {
    return res.status(403).json({ message: err.message });
  }
  if (err.type === "error_unauthorized") {
    return res.status(401).json({ message: err.message });
  }
  if (err.type === "error_bad_request") {
    return res.status(400).json({ message: err.message });
  }
  if (err.type === "error_not_acceptable") {
    return res.status(406).json({ message: err.message });
  }

  return res.status(500).json({ message: err.message });
};

export default errorHandler;
