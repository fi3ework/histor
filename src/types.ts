export interface IDiff {
  path: (string | number)[]
  from: any
  to: any
}

export interface IOnChange {
  (diff: IDiff): void
}

export const $HISTOR = Symbol('has been a histor instance')
