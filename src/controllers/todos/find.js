import findService from '../../services/todos/find'

const find = async (ctx) => {
  try {
    const page = parseInt(ctx.request.body.page) || 1
    const pageSize = parseInt(ctx.request.body.pageSize) || 10

    const sorting = ctx.request.body.sorting || []

    const data = await findService(page, pageSize, sorting)

    ctx.body = data
  } catch (error) {
    ctx.throw(error)
  }
}

export default find
