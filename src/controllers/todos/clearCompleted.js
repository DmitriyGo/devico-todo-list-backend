import { Todo } from '../../entities/todo.js'

const clearCompleted = async (req, res) => {
  try {
    const todos = await Todo.deleteMany({ completed: true })

    res.setHeader('Content-type', 'application/json')
    res.end(JSON.stringify(todos))
  } catch (error) {
    console.log(`Could not clear todos: ${error}`)
  }
}

export default clearCompleted
