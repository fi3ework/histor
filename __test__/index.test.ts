import histor, { IDiff } from '../src/index'

const diffEqual = (result: IDiff, expected: IDiff) => {
  expect(result).toEqual(expected)
}

test('basic', () => {
  const person = {
    name: 'a'
  }
  const p = histor(person, diff => {
    diffEqual(diff, {
      path: ['name'],
      from: 'a',
      to: 'b'
    })
  })

  p.name = 'b'
})

test('nested object with Array', () => {
  const person: any = {
    name: 'a',
    friend: {
      f1: {
        name: 'F_A'
      }
    }
  }

  const history: IDiff[] = []

  const p = histor(person, diff => {
    history.push(diff)
  })

  // 0
  p.friend.f1.name = 'F_B'
  // 1
  p.friend.f1.skills = ['eat', 'sleep']
  // 2
  p.friend.f1.skills.push('code')

  diffEqual(history[0], {
    path: ['friend', 'f1', 'name'],
    from: 'F_A',
    to: 'F_B'
  })

  // WARNING: `to` should be `['eat', 'sleep']` cause this operation is in the front
  // Indeed, the following operation will change the skills deeply and the reference of the value is the same
  diffEqual(history[1], {
    path: ['friend', 'f1', 'skills'],
    from: undefined,
    to: ['eat', 'sleep', 'code']
  })

  diffEqual(history[2], {
    path: ['friend', 'f1', 'skills', '2'],
    from: undefined,
    to: 'code'
  })
})
