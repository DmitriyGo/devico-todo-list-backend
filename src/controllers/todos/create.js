import { Todo } from '../../entities/todo.js'

const create = async (ctx) => {
  try {
    const createdTodo = await Todo.create(ctx.request.body)

    ctx.type = 'application/json'
    ctx.body = createdTodo
  } catch (error) {
    console.log(`Could not create todo: ${error}`)
  }
}

export default create
