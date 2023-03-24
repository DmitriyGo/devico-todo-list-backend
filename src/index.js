import { createServer } from 'http'
import { connect } from 'mongoose'
import { todoRouter } from './routes/todo-router.js'

import { config } from 'dotenv'

config()

const port = process.env.PORT
const connectionString = process.env.DATABASE_CONNECTION_STRING

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas')
  })
  .catch((error) => {
    console.error('❌ Failed to connect to MongoDB Atlas:', error)
  })

const server = createServer()

server.on('request', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  todoRouter(req, res)
})

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
