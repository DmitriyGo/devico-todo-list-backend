import { Todo } from '../../entities/todo.js'

const find = async (ctx) => {
  try {
    const page = parseInt(ctx.request.body.page) || 1
    const pageSize = parseInt(ctx.request.body.pageSize) || 10

    const skip = (page - 1) * pageSize
    const limit = pageSize

    const sort = {}

    const sorting = ctx.request.body.sorting || []
    console.log(sorting)
    for (const s of sorting) {
      if (s.field === 'name') {
        sort.name = s.sort === 'desc' ? -1 : 1
      } else if (s.field === 'completed') {
        sort.completed = s.sort === 'desc' ? -1 : 1
      } else if (s.field === 'createdAt') {
        sort.createdAt = s.sort === 'desc' ? -1 : 1
      }
    }

    const items = await Todo.find().sort(sort).skip(skip).limit(limit)

    const total = await Todo.countDocuments()
    const active = await Todo.countDocuments({ completed: false })
    const completed = await Todo.countDocuments({ completed: true })

    const totalPages = Math.ceil(total / pageSize)

    const data = {
      items,
      total,
      active,
      completed,
      totalPages,
      currentPage: page,
    }

    ctx.body = data
  } catch (error) {
    ctx.throw(error)
  }
}

export default find
