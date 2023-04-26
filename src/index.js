import { config } from 'dotenv'
import setupApp from './app'

config()

setupApp(process.env.PORT || 8000)
