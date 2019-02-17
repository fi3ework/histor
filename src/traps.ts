import { IOnChange, $HISTOR } from './types'

export const isPrimitive = value => value === null || (typeof value !== 'object' && typeof value !== 'function')

const makeRootProxy = (onChange: IOnChange, propMap: WeakMap<any, any>) => {
  const createTraps = (): ProxyHandler<any> => {
    return {
      get(target, prop, receiver) {
        if (target[$HISTOR]) {
          return target
        }

        const value = Reflect.get(target, prop, receiver)
        if (isPrimitive(value) || target[$HISTOR]) {
          return value
        }

        const proxy = new Proxy(value, createTraps())
        // going to lazy init the uninitialized prop object
        propMap.set(proxy, {
          prop: prop,
          parent: receiver
        })

        return proxy
      },
      set(target, prop, value, receiver) {
        const previous = Reflect.get(target, prop, value)
        const propChain: string[] = [prop.toString()]
        if (previous !== value) {
          // onchange
          let currReceiver = receiver
          let currMeta
          while ((currMeta = propMap.get(currReceiver))) {
            propChain.unshift(currMeta.prop)
            currReceiver = currMeta.parent
          }

          onChange({
            path: propChain,
            from: previous,
            to: value
          })
        }
        Reflect.set(target, prop, value)
        return true
      }
    }
  }
  return createTraps
}

export default makeRootProxy
