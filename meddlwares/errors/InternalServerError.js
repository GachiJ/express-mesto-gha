class InternalServerError extends Error {
  constructor(err) {
    super(err);
    this.message = err.body;
    this.statusCode = 500;
  }
}
module.exports = InternalServerError;
