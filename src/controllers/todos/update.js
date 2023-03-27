import { Todo } from '../../entities/todo.js'

const update = async (ctx) => {
  try {
    const id = ctx.params.id
    const updatedTodo = await Todo.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    })

    ctx.type = 'application/json'
    ctx.body = updatedTodo
  } catch (error) {
    console.log(`Could not update todo: ${error}`)
  }
}

export default update
