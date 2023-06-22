class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 404;
  }

  toJSON() {
    return {
      message: this.message,
    };
  }
}

module.exports = NotFoundError;
