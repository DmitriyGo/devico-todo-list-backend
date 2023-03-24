import { Todo } from '../models/todo.js'
import { parseBody } from '../helpers/parse-body.js'

export async function todoRouter(req, res) {
  const { url, method } = req

  try {
    if (url === '/todos' && method === 'GET') {
      const todos = await Todo.find({})

      const data = {
        items: todos,
        total: todos.length,
        active: todos.filter((t) => !t.completed).length,
        completed: todos.filter((t) => t.completed).length,
      }

      res.setHeader('Content-type', 'application/json')

      res.end(JSON.stringify(data))
    } else if (url === '/todos' && method === 'POST') {
      const body = await parseBody(req)

      const createdTodo = await Todo.create(JSON.parse(body))

      res.setHeader('Content-type', 'application/json')

      res.end(JSON.stringify(createdTodo))
    } else if (url.startsWith('/todos/') && method === 'PUT') {
      const id = url.slice('/todos/'.length)
      const body = await parseBody(req)

      const updatedTodo = await Todo.findByIdAndUpdate(id, JSON.parse(body), {
        new: true,
      })

      res.setHeader('Content-type', 'application/json')

      res.end(JSON.stringify(updatedTodo))
    } else if (url === '/todos/clearCompleted' && method === 'POST') {
      await Todo.deleteMany({ completed: true })
      const todos = await Todo.find({})

      res.setHeader('Content-type', 'application/json')

      res.end(JSON.stringify(todos))
    } else if (url.startsWith('/todos/') && method === 'DELETE') {
      const id = url.slice('/todos/'.length)
      const deletedTodo = await Todo.findByIdAndDelete(id)

      res.setHeader('Content-type', 'application/json')

      res.end(JSON.stringify(deletedTodo))
    }
  } catch (err) {
    console.error(err)
  }
}
