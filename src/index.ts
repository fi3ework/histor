import createTraps from './traps'
import { $PROP, $PARENT, $ROOT, $ACTIONS, IOnChange } from './types'

// const stampTag = (tagName: string) => {
//   const currTag = Symbol('symbol for current tag')
// }

function histor<T>(target: T, onChange: IOnChange): T {
  if (typeof target !== 'object') {
    throw Error('only accept an object')
  }

  const proxy = new Proxy<any>(target, createTraps(onChange))

  // root proxy element
  proxy[$PARENT] = null
  proxy[$PROP] = null
  proxy[$ROOT] = true
  proxy[$ACTIONS] = []

  return proxy
}

export default histor
