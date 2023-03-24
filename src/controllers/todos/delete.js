import { Todo } from '../../entities/todo.js'

const deleteTodo = async (req, res) => {
  try {
    const id = req.url.slice('/todos/'.length)
    const deletedTodo = await Todo.findByIdAndDelete(id)

    res.setHeader('Content-type', 'application/json')
    res.end(JSON.stringify(deletedTodo))
  } catch (error) {
    console.log(`Could not delete todo: ${error}`)
  }
}

export default deleteTodo
