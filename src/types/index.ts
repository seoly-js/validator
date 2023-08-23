export type Value = [string, number, boolean, undefined, null]// string | number | boolean | undefined | null
export type Target = Record<string, Value>
export type Rule<T> = // (val: Value, target: T, ...extra) => boolean | string
((val: string, target: T, ...extra) => boolean | string)
| ((val: number, target: T, ...extra) => boolean | string)
| ((val: boolean, target: T, ...extra) => boolean | string)
| ((val: undefined, target: T, ...extra) => boolean | string)
| ((val: null, target: T, ...extra) => boolean | string)

export type Rules<T> = Array<Rule<T>>

export interface FieldConstraint<T> {
  required?: boolean
  rules: Rules<T>
}

export interface ValidationError {
  name: string
  reasons: Array<string>
}

export interface ValidatorOptions {
  requiredMessage?: string
}
