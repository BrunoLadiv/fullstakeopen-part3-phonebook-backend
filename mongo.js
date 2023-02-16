const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('provide password')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://brunokasprik:${password}@phonebook-database.rka43iw.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)
if (process.argv.length > 4) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then((res) => {
    console.log(`added ${person.name} number ${person.number} to the phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('phonebook:')
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
