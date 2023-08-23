import type { FieldConstraint, ValidationError, Target, ValidatorOptions } from './types';
export default class<T = Target> {
    options: ValidatorOptions;
    constraint: Record<string, FieldConstraint<T>>;
    constructor(options?: ValidatorOptions);
    addField(name: string, constraint: FieldConstraint<T>): void;
    validate<S extends T>(target: S): Array<ValidationError>;
}
