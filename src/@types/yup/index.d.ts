import {StringSchema} from "yup";
declare module 'yup' {
    interface StringSchema {
        name(acceptSpace?:boolean): StringSchema;
        password(): StringSchema;
        phone(): StringSchema;
        number(): StringSchema;
    }
    interface DateSchema {
        future(): DateSchema;
    }
}
