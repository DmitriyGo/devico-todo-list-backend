import Router from 'koa-router'
import {
  find,
  create,
  update,
  deleteTodo,
  clearCompleted,
} from '../controllers/todos'
import setJsonContentType from '../middlewares/content-type'
import authMiddleware from '../middlewares/auth'

const router = new Router()

router.prefix('/todos')

router.use(authMiddleware)

router.use(setJsonContentType)

router.post('/', find)

router.post('/create', create)

router.put('/:id', update)

router.delete('/clear-completed', clearCompleted)

router.post('/delete', deleteTodo)

export default router
