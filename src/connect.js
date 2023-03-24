import { connect } from 'mongoose'

const connectToMongo = async (connectionString) => {
  try {
    await connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('✅ Successfully connected to MongoDB Atlas')
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB Atlas:', error)
  }
}

export default connectToMongo
