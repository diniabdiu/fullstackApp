require('dotenv').config()
const mongoose = require('mongoose')
const password = 'kolkol'
const url = process.env.MONGODB_URI

mongoose.connect(url).then(result => {
    console.log('connected to MongoDB')
}).catch(error => {
    console.log('error connecting to mongoDB:', error.message)
})

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
  })

  noteSchema.set('toJSON', {
      transform: (document, returnedObject) => {
          returnedObject.id = returnedObject._id.toString()
          delete returnedObject._id
          delete returnedObject.__v
      }
  })

  module.exports = mongoose.model('Note', noteSchema)