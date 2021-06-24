import * as Yup from "yup";

Yup.addMethod(Yup.string, 'name', function() {
    return this.test({
        name: 'name',
        message: 'invalid-name',
        test: (value) => {
            return /^[A-Za-z]*$/.test(String(value));
        }
    });
});
Yup.setLocale({
    // use constant translation keys for messages without values
    mixed: {
        required: 'required-field',
        default: 'invalid-input',
    },
    // use functions to generate an error object that includes the value from the schema
    number: {
        min: ({ min }:{min:number}) => ({ key: 'low-value', values: { min } }),
        max: ({ max }:{max:number}) => ({ key: 'high-value', values: { max } }),
    },
    string: {
        email: 'invalid-email'
    }
});
