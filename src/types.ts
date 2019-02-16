export const $HISTOR = Symbol('histor instance')
export const $TAGS = Symbol('tags will be saved here')
export const $PARENT = Symbol('parent')
export const $PROP = Symbol('prop')
export const $ROOT = Symbol('root delegate object')
export const $ACTIONS = Symbol('actions')

interface IDiff {
  propPath: string[]
  from: any
  to: any
}

export interface IOnChange {
  (diff: IDiff): void
}
