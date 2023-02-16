const express = require('express')
const app = express()
app.use(express.json())
let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

function getDate() {
  return new Date()
}

app.get('/info', (request, response) => {
  const date = getDate()

  response.send(
    `<h2>Phonebook has info for ${persons.length} people</h2>
     <p>${date}</p>`
  )
})

app.get('/', (request, response) => {
  response.send('<h1>Part3 phonebook backend</h1>')
})
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)

  person ? response.json(person) : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)

  

  if (!body.name && !body.number) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = [...persons, person]

  response.json(person)
})

const generateId = () => {
  const min = 100000
  const max = 999999
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
