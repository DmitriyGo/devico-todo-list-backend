import { Todo } from '../entities/todo.js'

class TodoService {
  static async getAllTodos() {
    try {
      return await Todo.find()
    } catch (error) {
      console.log(`Could not get todos: ${error}`)
    }
  }

  static async createTodo(todo) {
    try {
      return await Todo.create(JSON.parse(todo))
    } catch (error) {
      console.log(`Could not create todo: ${error}`)
    }
  }

  static async updateTodo(id, todo) {
    try {
      return await Todo.findByIdAndUpdate(id, JSON.parse(todo), {
        new: true,
      })
    } catch (error) {
      console.log(`Could not update todo: ${error}`)
    }
  }

  static async deleteTodo(id) {
    try {
      return await Todo.findByIdAndDelete(id)
    } catch (error) {
      console.log(`Could not delete todo: ${error}`)
    }
  }

  static async clearCompletedTodos() {
    try {
      await Todo.deleteMany({ completed: true })
      return await Todo.find({})
    } catch (error) {
      console.log(`Could not clear todos: ${error}`)
    }
  }
}

export default TodoService
