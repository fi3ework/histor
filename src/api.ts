import { $ROOT, $ACTIONS } from './types'

export const tag = (proxy: any, tagName: string) => {
  if (!proxy[$ROOT]) {
    throw Error('should be a histor object')
  }

  const currTag = Symbol('symbol for current tag')
  // inject a tag into actions to make a mark stamp
  proxy[$ACTIONS].push(currTag)
}
