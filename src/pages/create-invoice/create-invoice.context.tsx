import React, {useState, useEffect, createContext, useContext, FC} from 'react';
import {createInvoiceInitialValues, createInvoiceSteps, InvoiceFormType} from "./create-invoice.data";

export type CreateInvoiceContextType = {
    values: InvoiceFormType,
    setValues: (values: InvoiceFormType) => void;
    step: number;
    setStep: (step:number) => void;
}
export const CreateInvoiceContext = createContext<CreateInvoiceContextType>({
    values:createInvoiceInitialValues,
    setValues: () => {},
    step: createInvoiceSteps.CLIENT,
    setStep: () => {}
});

export const useInvoiceForm = () => useContext(CreateInvoiceContext);
export const CreateInvoiceProvider: FC<{}> = ({children}) => {
    const [values, setValues] = useState(createInvoiceInitialValues);
    const [step, setStep] = useState(createInvoiceSteps.CLIENT);
    return (
        <CreateInvoiceContext.Provider value={{
            values, setValues,
            step, setStep
        }}>
            {children}
        </CreateInvoiceContext.Provider>
    )
}