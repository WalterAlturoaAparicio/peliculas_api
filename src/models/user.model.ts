import mongoose from 'mongoose'
const Schema = new mongoose.Schema({
  displayName: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  },
  { timestamps: true }
)

export default mongoose.model('User',Schema)

