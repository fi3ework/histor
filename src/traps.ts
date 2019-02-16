import { isPrimitive } from './utils'
import { $PARENT, $PROP } from './types'

const createTraps = (): ProxyHandler<any> => {
  return {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver)
      if (isPrimitive(value)) {
        return value
      }

      const proxy = new Proxy(value, createTraps())
      // going to lazy init the uninitialized prop object
      proxy[$PROP] = prop // set child's prop name
      proxy[$PARENT] = receiver // set child's parent
      return proxy
    },
    set(target, prop, value, receiver) {
      if (prop === $PARENT || prop === $PROP) {
        Reflect.set(target, prop, value)
        return true
      }

      const previous = Reflect.get(target, prop, value)
      const propChain: string[] = [prop.toString()]
      if (previous !== value) {
        // onchange
        let currReceiver = receiver
        while (typeof currReceiver[$PROP] === 'string') {
          propChain.push(currReceiver[$PROP])
          currReceiver = currReceiver[$PARENT]
        }
      }

      console.log(propChain.join(' '))
      const result = Reflect.set(target, prop, value)
      return true
    }
  }
}

export default createTraps
