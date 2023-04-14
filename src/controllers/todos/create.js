import { Todo } from '../../entities/todo.js'
import validateAccessToken from '../../services/token/validateAccessToken'

const create = async (ctx) => {
  try {
    const accessToken = ctx.request.headers.authorization.split(' ')[1]

    const decodedToken = validateAccessToken(accessToken)
    const userId = decodedToken.id

    const todoData = {
      ...ctx.request.body,
      user: userId,
    }

    const createdTodo = await Todo.create(todoData)

    ctx.status = 201
    ctx.body = createdTodo
  } catch (error) {
    ctx.throw(error)
  }
}

export default create
