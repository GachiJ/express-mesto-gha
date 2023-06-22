class BadRequestError extends Error {
  constructor(err) {
    super(err);
    this.message = err.body;
    this.statusCode = 400;
  }
}
module.exports = BadRequestError;
