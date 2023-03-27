import { Todo } from '../../entities/todo.js'

const find = async (ctx) => {
  try {
    const items = await Todo.find()

    const total = await Todo.countDocuments()
    const active = await Todo.countDocuments({ completed: false })
    const completed = await Todo.countDocuments({ completed: true })

    const data = {
      items,
      total,
      active,
      completed,
    }

    ctx.type = 'application/json'
    ctx.body = data
  } catch (error) {
    console.log(`Could not get todos: ${error}`)
  }
}

export default find
