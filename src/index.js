import koa from 'koa'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import logger from 'koa-logger'
import cors from 'koa-cors'

import todoRouter from './routes/todo-router.js'
import connectToMongo from './connect.js'

import { config } from 'dotenv'

config()

connectToMongo()

const app = new koa()

app.use(logger())
app.use(bodyParser())
app.use(helmet())
app.use(cors())

app.use(todoRouter.routes())
app.use(todoRouter.allowedMethods())

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
