import BaseError from "./BaseError";

class NotAuthorizedError extends BaseError {
  constructor(model) {
    super(`Not authorized`, 403);
  }
}

export default NotAuthorizedError;
