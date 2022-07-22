require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')

const uuid = require('uuid')
const uuidv4 = uuid.v4

const Note = require('./models/note')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.get('/', (request, response) => {
  response.send('HAJ THER')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)

  Note.findById(id).then(note => {
    res.json(note).end()
  })  
})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  // notes = notes.find(note => note.id === id)
  Note.findByIdAndRemove(id)
  .then(result => {
    res.status(204).end()
  })
  
})

app.post('/api/notes', (req,res) => {
  const body = req.body
  
  if (body.content === undefined) {
    return res.status(400).json({ error: 'content missing' }).end()
  }

  const note = new Note( {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: uuidv4()
  })

  note.save().then(savedNote => {
    console.log(savedNote)
    res.json(savedNote).end()
  })
 
})

app.put('/api/notes/:id', (req, res) => {

  // get info from body request
  const body = req.body
  // find id from params and convert to number for sure!
  const id = Number(req.params.id)

  Note.findByIdAndUpdate(id, body).then(noteUpdate => {
    res.json(noteUpdate).end()
  })

  // const noteIndex = notes.findIndex(n => n.id === id)

  // notes[noteIndex] = body
  // res.json(notes[noteIndex]).end()
})
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})