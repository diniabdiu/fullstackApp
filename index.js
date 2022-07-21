const express = require('express')
const app = express()
const cors = require('cors')

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true
  }
]

app.use(express.json())
app.use(cors())


app.get('/', (request, response) => {
  response.send('HAJ THER')
})

app.get('/api/notes', (request, response) => {
  response.json(notes).end()
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note  = notes.find(note => note.id === id)
  res.json(note).end()
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.find(note => note.id === id)
  res.status(204).end()
})

app.post('/api/notes', (req,res) => {
  const body = req.body

  if (body.content === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    res.json(savedNote).end()
  })
})

app.put('/api/notes/:id', (req, res) => {

  // get info from body request
  const body = req.body
  // find id from params and convert to number for sure!
  const id = Number(req.params.id)

  const noteIndex = notes.findIndex(n => n.id === id)

  notes[noteIndex] = body
  res.json(notes[noteIndex]).end()
})

const PORT = process.env.PORT || 3010
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})