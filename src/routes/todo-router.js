import {
  find,
  create,
  update,
  deleteTodo,
  clearCompleted,
} from '../controllers/todos'

export async function todoRouter(req, res) {
  const { url, method } = req

  try {
    if (url === '/todos' && method === 'GET') {
      return await find(req, res)
    }

    if (url === '/todos' && method === 'POST') {
      return await create(req, res)
    }

    if (url.startsWith('/todos/') && method === 'PUT') {
      return await update(req, res)
    }

    if (url.startsWith('/todos/') && method === 'DELETE') {
      return await deleteTodo(req, res)
    }

    if (url === '/todos/clearCompleted' && method === 'POST') {
      return await clearCompleted(req, res)
    }
  } catch (err) {
    console.error(err)
  }
}
