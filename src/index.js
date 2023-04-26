import setupApp from './app'

require('dotenv').config()

setupApp(process.env.PORT || 8000)
