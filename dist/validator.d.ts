import type { FieldConstraint, ValidationError, Target, ValidatorOptions, Rules } from './types';
export default class<T = Target> {
    options: ValidatorOptions;
    constraint: Record<string, FieldConstraint<T>>;
    constructor(options?: ValidatorOptions);
    addField(name: string, constraint: FieldConstraint<T>): void;
    test(rules: Rules<T>): void;
    validate<S extends T>(target: S): Array<ValidationError>;
}
