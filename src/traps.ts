import { isPrimitive } from './utils'
import { IOnChange, $PARENT, $PROP, $ROOT, $ACTIONS } from './types'

const isInternalProp = (prop: symbol | string | number) => {
  return prop === $PARENT || prop === $PROP || prop === $ROOT || prop === $ACTIONS
}

const createTraps = (onChange: IOnChange): ProxyHandler<any> => {
  return {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver)
      if (isPrimitive(value) || target[$PROP]) {
        return value
      }

      const proxy = new Proxy(value, createTraps(onChange))
      // going to lazy init the uninitialized prop object
      proxy[$PROP] = prop // set child's prop name
      proxy[$PARENT] = receiver // set child's parent
      return proxy
    },
    set(target, prop, value, receiver) {
      if (isInternalProp(prop)) {
        Reflect.set(target, prop, value)
        return true
      }

      const previous = Reflect.get(target, prop, value)
      const propChain: string[] = [prop.toString()]
      if (previous !== value && !isInternalProp(prop)) {
        // onchange
        let currReceiver = receiver
        while (!currReceiver[$ROOT]) {
          propChain.unshift(currReceiver[$PROP])
          currReceiver = currReceiver[$PARENT]
        }

        onChange({
          propPath: propChain,
          from: previous,
          to: value
        })
      }
      Reflect.set(target, prop, value)
      return true
    }
  }
}

export default createTraps
