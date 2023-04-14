import findService from '../../services/todos/find'
import validateAccessToken from '../../services/token/validateAccessToken'

const find = async (ctx) => {
  try {
    const accessToken = ctx.request.headers.authorization.split(' ')[1]

    const decodedToken = validateAccessToken(accessToken)
    const userId = decodedToken.id

    const page = parseInt(ctx.request.body.page) || 1
    const pageSize = parseInt(ctx.request.body.pageSize) || 10

    const sorting = ctx.request.body.sorting || []

    ctx.body = await findService(page, pageSize, sorting, userId)
  } catch (error) {
    ctx.throw(error)
  }
}

export default find
