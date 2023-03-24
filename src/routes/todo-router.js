import TodoController from '../controllers/todo-controller.js'

export async function todoRouter(req, res) {
  const { url, method } = req

  try {
    if (url === '/todos' && method === 'GET') {
      return await TodoController.getAllTodos(req, res)
    }

    if (url === '/todos' && method === 'POST') {
      return await TodoController.createTodo(req, res)
    }

    if (url.startsWith('/todos/') && method === 'PUT') {
      return await TodoController.updateTodo(req, res)
    }

    if (url.startsWith('/todos/') && method === 'DELETE') {
      return await TodoController.deleteTodo(req, res)
    }

    if (url === '/todos/clearCompleted' && method === 'POST') {
      return await TodoController.clearCompletedTodos(req, res)
    }
  } catch (err) {
    console.error(err)
  }
}
