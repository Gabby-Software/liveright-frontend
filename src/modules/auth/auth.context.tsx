import React, {createContext, useContext, useState, ComponentType, ElementType} from 'react';
import {AuthFormFieldsType, AuthFormType} from "./auth-form.type";
import userTypes from "../../enums/user-types.enum";

export const AuthFormContext = createContext<AuthFormType>(null);
export const AuthFormProvider = ({children}:{children: any}) => {
  const [form, setForm] = useState<AuthFormFieldsType>({
      type: userTypes.CLIENT,
      name:'',
      email: '',
      password: '',
  });
  const update = (name: string, value: string) => setForm({...form, [name]:value});
  return (
      <AuthFormContext.Provider value={{form, update}}>{children}</AuthFormContext.Provider>
  )
};
