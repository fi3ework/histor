import makeRootProxy from './traps'
import { IOnChange, IDiff } from './types'

function histor<T>(target: T, onChange: IOnChange): T {
  if (typeof target !== 'object') {
    throw Error('only accept an object')
  }

  const propMap = new WeakMap()
  const traps = makeRootProxy(onChange, propMap)
  const proxy = new Proxy<any>(target, traps())

  return proxy
}

export default histor
export { IOnChange, IDiff }
