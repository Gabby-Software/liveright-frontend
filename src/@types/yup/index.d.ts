// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StringSchema } from 'yup'
declare module 'yup' {
  interface StringSchema {
    name(acceptSpace?: boolean): StringSchema
    password(): StringSchema
    phone(): StringSchema
    number(): StringSchema
    zip(): StringSchema
  }
  interface DateSchema {
    future(): DateSchema
  }
}
