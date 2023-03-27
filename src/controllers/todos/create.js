import { Todo } from '../../entities/todo.js'

const create = async (ctx) => {
  try {
    const createdTodo = await Todo.create(ctx.request.body)

    ctx.status = 201
    ctx.body = createdTodo
  } catch (error) {
    ctx.throw(error)
  }
}

export default create
