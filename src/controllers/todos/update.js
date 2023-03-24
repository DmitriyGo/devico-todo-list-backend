import { Todo } from '../../entities/todo.js'
import parseBody from '../../helpers/parse-body.js'

const update = async (req, res) => {
  try {
    const id = req.url.slice('/todos/'.length)
    const body = await parseBody(req)
    const updatedTodo = await Todo.findByIdAndUpdate(id, JSON.parse(body), {
      new: true,
    })

    res.setHeader('Content-type', 'application/json')
    res.end(JSON.stringify(updatedTodo))
  } catch (error) {
    console.log(`Could not update todo: ${error}`)
  }
}

export default update
