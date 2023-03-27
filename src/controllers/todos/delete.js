import { Todo } from '../../entities/todo.js'

const deleteTodo = async (ctx) => {
  try {
    const id = ctx.params.id // assumes id is passed as a URL parameter
    const deletedTodo = await Todo.findByIdAndDelete(id)

    ctx.type = 'application/json'
    ctx.body = deletedTodo
  } catch (error) {
    console.log(`Could not delete todo: ${error}`)
  }
}

export default deleteTodo
