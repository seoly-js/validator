import type { FieldConstraint, ValidationError, Target, Value, ValidatorOptions, Rule, Rules } from './types'

const REQUIRED = (val: Value, message: string) => !!val ? true : message

export default class<T = Target> {

  options: ValidatorOptions
  constraint: Record<string, FieldConstraint<T>> = {}

  constructor(options?: ValidatorOptions) {
    this.options = {
      requiredMessage: options?.requiredMessage ?? 'this value is required'
    }
  }

  addField(name: string, constraint: FieldConstraint<T>) {
    if (constraint.required) constraint.rules = [
      (val) => REQUIRED(val, this.options.requiredMessage),
      ...constraint.rules
      ]
    this.constraint[name] = {
      rules: constraint.rules,
      required: constraint.required ?? false
    }
  }

  test(rules: Rules<T>) {

  }

  validate<S extends T>(target: S): Array<ValidationError> {
    const keys = Object.keys(target)
    const errors = keys.reduce((result, key) => {
      if (!Object.hasOwn(this.constraint, key)) return result
      if (!target[key] && !this.constraint[key].required) return result

      const reasons = this.constraint[key].rules.reduce((result, rule) => {
        const validation = rule(target[key], target)
        const fails = typeof(validation) == 'string' ? validation : validation == false ? 'Validation Fail' : null
        if (fails) result.push(fails)
        return result
      }, [] as Array<string>)
      
      if (reasons.length > 0) result.push({name: key, reasons: reasons})
      return result
    }, [] as Array<ValidationError>)

    return errors
  }
}