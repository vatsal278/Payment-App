const ApiError = require('../utils/errors');

/**
 * Generic request-body validator middleware.
 *
 * @param {object} schema — plain object describing required fields:
 *   {
 *     fieldName: {
 *       type:     'string' | 'number' | 'boolean' | 'email',  // required
 *       required: true | false,                                 // default true
 *       min:      <number>,   // min length for strings, min value for numbers
 *       max:      <number>,   // max length for strings, max value for numbers
 *       match:    <RegExp>,   // optional regex
 *       message:  <string>,   // custom error message
 *     }
 *   }
 *
 * Usage:
 *   router.post('/register', validate(registerSchema), controller.register);
 */
function validate(schema) {
    return (req, _res, next) => {
        const errors = [];

        for (const [field, rules] of Object.entries(schema)) {
            const value = req.body[field];
            const isRequired = rules.required !== false; // default true
            const label = rules.message ? `${field}` : field;

            // ── Required check ──
            if (isRequired && (value === undefined || value === null || value === '')) {
                errors.push(rules.message || `${label} is required`);
                continue; // skip further checks for this field
            }

            // If not required and not provided, skip other validations
            if (value === undefined || value === null || value === '') continue;

            // ── Type checks ──
            if (rules.type === 'string' && typeof value !== 'string') {
                errors.push(`${label} must be a string`);
                continue;
            }

            if (rules.type === 'number' && typeof value !== 'number') {
                errors.push(`${label} must be a number`);
                continue;
            }

            if (rules.type === 'boolean' && typeof value !== 'boolean') {
                errors.push(`${label} must be a boolean`);
                continue;
            }

            if (rules.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (typeof value !== 'string' || !emailRegex.test(value)) {
                    errors.push(`${label} must be a valid email address`);
                    continue;
                }
            }

            // ── Length / value bounds ──
            if (rules.min !== undefined) {
                if (typeof value === 'string' && value.length < rules.min) {
                    errors.push(`${label} must be at least ${rules.min} characters`);
                } else if (typeof value === 'number' && value < rules.min) {
                    errors.push(`${label} must be at least ${rules.min}`);
                }
            }

            if (rules.max !== undefined) {
                if (typeof value === 'string' && value.length > rules.max) {
                    errors.push(`${label} must be at most ${rules.max} characters`);
                } else if (typeof value === 'number' && value > rules.max) {
                    errors.push(`${label} must be at most ${rules.max}`);
                }
            }

            // ── Regex match ──
            if (rules.match && typeof value === 'string' && !rules.match.test(value)) {
                errors.push(rules.message || `${label} format is invalid`);
            }
        }

        if (errors.length > 0) {
            return next(ApiError.badRequest(errors.join('; ')));
        }

        next();
    };
}

module.exports = validate;
