import { Schema, model } from 'mongoose'

const todoSchema = new Schema(
  {
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
)

export const Todo = model('Todo', todoSchema)
