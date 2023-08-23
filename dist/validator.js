"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const REQUIRED = (val, message) => !!val ? true : message;
class default_1 {
    options;
    constraint = {};
    constructor(options) {
        this.options = {
            requiredMessage: options?.requiredMessage ?? 'this value is required'
        };
    }
    addField(name, constraint) {
        if (constraint.required)
            constraint.rules = [
                (val) => REQUIRED(val, this.options.requiredMessage),
                ...constraint.rules
            ];
        this.constraint[name] = {
            rules: constraint.rules,
            required: constraint.required ?? false
        };
    }
    test(rules) {
    }
    validate(target) {
        const keys = Object.keys(target);
        const errors = keys.reduce((result, key) => {
            if (!Object.hasOwn(this.constraint, key))
                return result;
            if (!target[key] && !this.constraint[key].required)
                return result;
            const reasons = this.constraint[key].rules.reduce((result, rule) => {
                const validation = rule(target[key], target);
                const fails = typeof (validation) == 'string' ? validation : validation == false ? 'Validation Fail' : null;
                if (fails)
                    result.push(fails);
                return result;
            }, []);
            if (reasons.length > 0)
                result.push({ name: key, reasons: reasons });
            return result;
        }, []);
        return errors;
    }
}
exports.default = default_1;
//# sourceMappingURL=validator.js.map