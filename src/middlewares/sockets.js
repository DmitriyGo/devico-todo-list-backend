const socketsMiddleware = (io) => {
  return async (ctx, next) => {
    ctx.onSocket = (ev, callback) => {
      io.on(ev, callback)
    }

    ctx.emitSocket = (to, ev, args) => {
      io.to(to).emit(ev, args)
    }

    await next()
  }
}

export default socketsMiddleware
