import ApiError from '../exceptions/ApiError'

export const errorHandler = async (err, ctx) => {
  if (err instanceof ApiError) {
    ctx.status = err.status
    ctx.body = {
      error: {
        message: err.message,
        errors: err.errors,
      },
    }
  } else {
    ctx.status = 500
    ctx.body = {
      error: {
        message: 'Internal Server Error',
      },
    }
  }
}
