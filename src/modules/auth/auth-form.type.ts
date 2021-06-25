export type AuthFormFieldsType = {
    type:string;
    first_name:string;
    last_name:string;
    email:string;
    password: string;
}
export type AuthFormTypeNotNull = {
    form: AuthFormFieldsType;
    update: (name: string, value: string) => void;
};
export type AuthFormType = AuthFormTypeNotNull | null;
