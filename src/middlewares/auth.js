import validateAccessToken from '../services/token/validateAccessToken'
import ApiError from '../exceptions/ApiError'

const authMiddleware = async (ctx, next) => {
  try {
    const authorizationHeader = ctx.headers.authorization
    if (!authorizationHeader) {
      throw ApiError.UnauthorizedError()
    }

    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = validateAccessToken(accessToken)
    if (!userData) {
      throw ApiError.UnauthorizedError()
    }

    ctx.state.user = userData
    await next()
  } catch (e) {
    ctx.throw(e)
  }
}

export default authMiddleware