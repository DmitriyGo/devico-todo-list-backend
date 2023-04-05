import Router from 'koa-router'
import {
  find,
  create,
  update,
  deleteTodo,
  clearCompleted,
} from '../controllers/todos'
import setJsonContentType from '../middlewares/content-type'

const router = new Router()

router.use(setJsonContentType)

router.post('/todos', find)

router.post('/todos/create', create)

router.put('/todos/:id', update)

router.delete('/todos/clear-completed', clearCompleted)

router.post('/todos/delete', deleteTodo)

export default router
