import Router from 'koa-router'
import {
  find,
  create,
  update,
  deleteTodo,
  clearCompleted,
} from '../controllers/todos'

const router = new Router()

router.get('/todos', find)

router.post('/todos', create)

router.put('/todos/:id', update)

router.delete('/todos/clear-completed', clearCompleted)

router.delete('/todos/:id', deleteTodo)

export default router
