import {StringSchema} from "yup";
declare module 'yup' {
    interface StringSchema {
        name(): StringSchema;
        password(): StringSchema;
    }
}
