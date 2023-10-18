import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.type === "error_unprocessable_entity") {
    return res.status(422).send(err.message);
  }

  if (err.type === "error_unauthorized") {
    return res.status(401).send(err.message);
  }

  if (err.type === "error_not_found") {
    return res.status(404).send(err.message);
  }

  if (err.type === "error_conflict") {
    return res.status(409).send(err.message);
  }

  if (err.type === "error_access_denied") {
    return res.status(403).send(err.message);
  }
  if (err.type === "error_unauthorized") {
    return res.status(401).send(err.message);
  }
  if (err.type === "error_bad_request") {
    return res.status(400).send(err.message);
  }
  if (err.type === "error_not_acceptable") {
    return res.status(406).send(err.message);
  }

  return res.status(500).send(err.message);
};

export default errorHandler;
