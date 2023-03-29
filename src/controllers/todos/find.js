import { Todo } from '../../entities/todo.js'

const find = async (ctx) => {
  try {
    const page = parseInt(ctx.query.page) || 1
    const pageSize = parseInt(ctx.query.pageSize) || 10

    const skip = (page - 1) * pageSize
    const limit = pageSize

    const items = await Todo.find()
      .sort({ completed: 1, updatedAt: -1 })
      .skip(skip)
      .limit(limit)

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
