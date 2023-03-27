import { Todo } from '../../entities/todo.js'

const deleteTodo = async (ctx) => {
  try {
    const id = ctx.params.id

    if (id.length !== 24) {
      ctx.throw(400, 'Wrong id format')
    }

    const foundTodo = await Todo.findById(id)

    if (!foundTodo) {
      ctx.throw(404, 'Todo not found')
    }

    const deletedTodo = await foundTodo.deleteOne()

    ctx.body = deletedTodo
  } catch (error) {
    ctx.throw(error)
  }
}

export default deleteTodo
