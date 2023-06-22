class ForbiddenError extends Error {
  constructor(err) {
    super(err);
    this.message = err.body;
    this.statusCode = 403;
  }
}
module.exports = ForbiddenError;
