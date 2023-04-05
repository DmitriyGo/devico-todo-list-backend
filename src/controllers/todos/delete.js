import { Todo } from '../../entities/todo.js'

const deleteTodo = async (ctx) => {
  try {
    let ids = ctx.request.body.ids

    if (!Array.isArray(ids)) {
      ids = [ids]
    }

    if (ids.some((id) => id.length !== 24)) {
      ctx.throw(400, 'Wrong id format')
    }

    const foundTodos = await Promise.all(ids.map((id) => Todo.findById(id)))

    if (foundTodos.some((todo) => !todo)) {
      ctx.throw(404, 'Todo not found')
    }

    const deletedTodos = await Promise.all(
      foundTodos.map((todo) => todo.deleteOne()),
    )

    ctx.body = deletedTodos
  } catch (error) {
    ctx.throw(error)
  }
}

export default deleteTodo
