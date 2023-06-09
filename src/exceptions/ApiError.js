class ApiError extends Error {
  status
  errors

  constructor(status, message, errors) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError() {
    return new ApiError(401, 'User is not found')
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors)
  }

  static ValidationError(errors = []) {
    const message = `Validation error: ${errors.join(', ')}`
    return new ApiError(422, message, errors)
  }
}

export default ApiError
