import React, {useState, useEffect, createContext, useContext, FC} from 'react';
import {createInvoiceInitialValues, createInvoiceSteps, InvoiceFormType} from "./create-invoice.data";
import {AccountObjType} from "../../types/account.type";

export type CreateInvoiceContextType = {
    values: InvoiceFormType,
    setValues: (values: InvoiceFormType) => void;
    step: number;
    setStep: (step:number) => void;
    client: AccountObjType|null;
    setClient: (client: AccountObjType|null) => void;
}
export const CreateInvoiceContext = createContext<CreateInvoiceContextType>({
    values:createInvoiceInitialValues,
    setValues: () => {},
    step: createInvoiceSteps.CLIENT,
    setStep: () => {},
    client: null,
    setClient: () => {}
});

export const useInvoiceForm = () => useContext(CreateInvoiceContext);
export const CreateInvoiceProvider: FC<{}> = ({children}) => {
    const [values, setValues] = useState(createInvoiceInitialValues);
    const [step, setStep] = useState(createInvoiceSteps.CLIENT);
    const [client, setClient] = useState<AccountObjType|null>(null);
    return (
        <CreateInvoiceContext.Provider value={{
            values, setValues,
            step, setStep,
            client, setClient
        }}>
            {children}
        </CreateInvoiceContext.Provider>
    )
}