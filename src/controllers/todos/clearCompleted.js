import { Todo } from '../../entities/todo.js'

const clearCompleted = async (ctx) => {
  try {
    const todos = await Todo.deleteMany({ completed: true })

    ctx.type = 'application/json'
    ctx.body = todos
  } catch (error) {
    console.log(`Could not clear todos: ${error}`)
  }
}

export default clearCompleted
