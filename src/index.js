import koa from 'koa'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import logger from 'koa-logger'
import cors from 'koa-cors'
import { default as Cookies } from 'koa-cookie'

import todoRouter from './routes/todo-router.js'
import authRouter from './routes/auth-router.js'
import connectToMongo from './helpers/connect.js'
import { errorHandler } from './middlewares/error-handling.js'

import { config } from 'dotenv'

config()

connectToMongo()

const app = new koa()

app.use(Cookies())
app.use(logger())
app.use(bodyParser())
app.use(helmet())
app.use(
  cors({
    credentials: true,
    origin: process.env.PUBLIC_CLIENT_URL,
  }),
)

app.use(todoRouter.routes())
app.use(todoRouter.allowedMethods())

app.use(authRouter.routes())
app.use(authRouter.allowedMethods())

const port = process.env.PORT || 8000

app.on('error', errorHandler)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
