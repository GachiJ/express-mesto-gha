class ConflictError extends Error {
  constructor(err) {
    super(err);
    this.message = err.body;
    this.statusCode = 409;
  }
}
module.exports = ConflictError;
