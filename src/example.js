const historImport = require('../lib/index')

const histor = historImport.default

const person = {
  name: 'wee',
  age: 26,
  pets: {
    cat: 'c1',
    dog: 'd1'
  }
}

const p = histor(person)
p.pets.cat = 'c2'
