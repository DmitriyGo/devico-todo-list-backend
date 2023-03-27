import { Todo } from '../../entities/todo.js'

const clearCompleted = async (ctx) => {
  try {
    const todos = await Todo.deleteMany({ completed: true })

    ctx.body = todos
  } catch (error) {
    ctx.throw(error)
  }
}

export default clearCompleted
