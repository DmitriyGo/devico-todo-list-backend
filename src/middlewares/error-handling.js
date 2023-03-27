export const errorHandler = async (err, ctx) => {
  if (err.status === 404) {
    ctx.status = 404
    ctx.body = {
      message: 'Todo not found',
    }
  } else if (err.status === 401) {
    ctx.status = 401
    ctx.body = {
      message: 'Unauthorized request',
    }
  } else {
    ctx.status = err.statusCode || err.status || 500
    ctx.body = {
      message: err.message,
    }
  }
}
