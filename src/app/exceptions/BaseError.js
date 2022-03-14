class BaseError extends Error {
  constructor(message, code = 400) {
    super();
    this.message = message;
    this.code = code;
  }
  
  getMessage() {
    return this.message;
  }

  getCode() {
    return this.code;
  }
}

export default BaseError;
