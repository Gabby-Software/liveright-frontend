export type AuthFormFieldsType = {
    type:string;
    name:string;
    email:string;
    password: string;
}
export type AuthFormTypeNotNull = {
    form: AuthFormFieldsType;
    update: (name: string, value: string) => void;
};
export type AuthFormType = AuthFormTypeNotNull | null;
