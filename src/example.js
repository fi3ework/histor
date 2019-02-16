const historImport = require('../lib/index')
const histor = historImport.default

const person = {
  name: 'wee',
  age: 26,
  skills: ['eat', 'sleep'],
  pets: {
    cat: 'c1',
    dog: 'd1'
  }
}

const p = histor(person, diff => {
  console.log(`$${diff.propPath.map(p => `[${p}]`).join('')}: ${diff.from} ==> ${diff.to}`)

  console.log(`sth changed`)
})

p.pets.cat = 'c2'
p.pets.cat = 'c3'
p.skills.push('code')

const mobile = {
  system: 'iOS'
}

p.mobile = mobile

const skills = person.skills
