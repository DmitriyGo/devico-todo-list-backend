import TodoService from '../services/todo-service'
import { parseBody } from '../helpers/parse-body.js'

class TodoController {
  static async getAllTodos(req, res) {
    try {
      const todos = await TodoService.getAllTodos()

      const data = {
        items: todos,
        total: todos.length,
        active: todos.filter((t) => !t.completed).length,
        completed: todos.filter((t) => t.completed).length,
      }

      res.setHeader('Content-type', 'application/json')

      res.end(JSON.stringify(data))
    } catch (error) {
      console.log(`Could not get todos: ${error}`)
    }
  }

  static async createTodo(req, res) {
    try {
      const body = await parseBody(req)

      const createdTodo = await TodoService.createTodo(body)

      res.setHeader('Content-type', 'application/json')

      res.end(JSON.stringify(createdTodo))
    } catch (error) {
      console.log(`Could not create todo: ${error}`)
    }
  }

  static async updateTodo(req, res) {
    try {
      const id = req.url.slice('/todos/'.length)
      const body = await parseBody(req)

      const updatedTodo = await TodoService.updateTodo(id, body)

      res.setHeader('Content-type', 'application/json')

      res.end(JSON.stringify(updatedTodo))
    } catch (error) {
      console.log(`Could not update todo: ${error}`)
    }
  }

  static async deleteTodo(req, res) {
    try {
      const id = req.url.slice('/todos/'.length)
      const deletedTodo = await TodoService.deleteTodo(id)

      res.setHeader('Content-type', 'application/json')

      res.end(JSON.stringify(deletedTodo))
    } catch (error) {
      console.log(`Could not delete todo: ${error}`)
    }
  }

  static async clearCompletedTodos(req, res) {
    try {
      const todos = await TodoService.clearCompletedTodos()

      res.setHeader('Content-type', 'application/json')

      res.end(JSON.stringify(todos))
    } catch (error) {
      console.log(`Could not clear todos: ${error}`)
    }
  }
}

export default TodoController
