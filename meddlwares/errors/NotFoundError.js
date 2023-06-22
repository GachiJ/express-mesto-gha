class NotFoundError extends Error {
  constructor(err) {
    super(err);
    this.message = err.body;
    this.statusCode = 404;
  }
}
module.exports = NotFoundError;
