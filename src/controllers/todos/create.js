import { Todo } from '../../entities/todo.js'
import parseBody from '../../helpers/parse-body.js'

const create = async (req, res) => {
  try {
    const body = await parseBody(req)
    const createdTodo = await Todo.create(JSON.parse(body))

    res.setHeader('Content-type', 'application/json')
    res.end(JSON.stringify(createdTodo))
  } catch (error) {
    console.log(`Could not create todo: ${error}`)
  }
}

export default create
