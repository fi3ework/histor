/**
 * API:
 * tag: tag a tag
 * ls:  show all the tags
 * cd: switch to some tag
 * remove: delete a tag
 */

// const person = { age: 23 }
// const tagPerson = create(person)
// person.age = 24
// person.age = 25
// person.tag('sth') // save a snapshot

// from  {}
// to  {}

import createTraps from './traps'
import { $HISTOR, $TAGS } from './types'

// const INTERNAL_KEYS = {
//   TAG: `tag`,
//   CD: `cd`,
//   REMOVE: `remove`
// }

// interface ITags {
//   [prop: string]: any
// }

function histor<T>(target: T): T {
  if (typeof target !== 'object') {
    throw Error('only accept an object')
  }

  const proxy = new Proxy<any>(target, createTraps())

  // root proxy element
  proxy.parent = null
  proxy.prop = null

  proxy[$HISTOR] = true
  return proxy
}

export default histor
