import BaseError from "./BaseError";

class ObjectNotFound extends BaseError {
  constructor(model) {
    super(`${model} not found`, 404);
  }
}

export default ObjectNotFound;
