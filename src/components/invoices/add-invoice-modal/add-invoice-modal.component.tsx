import React, {useState, useEffect} from 'react';
import Styles from './add-invoice-modal.styles';
import Modal from "../../modal/modal.component";
import {Form, Formik, FormikHelpers, FormikProps} from "formik";
import * as Yup from 'yup';
import {InvoiceFormType} from "../../../types/invoice-form.type";
import {date} from "../../../pipes/date.pipe";
import FormDatepicker from "../../forms/form-datepicker/form-datepicker.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import FormRow from "../../forms/form-row/form-row.component";
import {serviceTypes} from "../../../enums/service-type.enum";
import moment from 'moment';
import FormInputLabeled from "../../forms/form-input-labeled/form-input-labeled.component";
import FormSelect from "../../forms/form-select/form-select.component";
import {clients} from "../../../pages/invoices/invoices.data";
import ButtonSubmit from "../../forms/button-submit/button-submit.component";
import Steps from "../../steps/steps.component";
import AddInvoiceModal1 from "./add-invoice-modal-1/add-invoice-modal-1.component";
import AddInvoiceModal2 from "./add-invoice-modal-2/add-invoice-modal-2.component";
import {initialValues, InvoiceContext} from "./add-invoice-modal.context";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export enum invoiceSteps {
    DETAILS,
    PRICE
}

const AddInvoiceModal = ({isOpen, onClose}: Props) => {
    const {t} = useTranslation();
    const [step, setStep] = useState(invoiceSteps.DETAILS);
    const [form, setForm] = useState<InvoiceFormType>(initialValues);
    const handleClose = () => {
        setStep(invoiceSteps.DETAILS);
        onClose();
    };
    const update = (name: string, value: any) => setForm({...form, [name]:value});
    return (
        <Modal visible={isOpen} onCancel={handleClose}>
            <Styles>
                <h1 className={'add-invoice__title'}>{t('invoices:add')}</h1>
                <InvoiceContext.Provider value={{form, update, step, setStep, onClose: handleClose}}>
                    <Steps currentStep={step}>
                        <Steps.Step>
                            <AddInvoiceModal1/>
                        </Steps.Step>
                        <Steps.Step>
                            <AddInvoiceModal2/>
                        </Steps.Step>
                    </Steps>
                </InvoiceContext.Provider>
            </Styles>
        </Modal>
    );
};

export default AddInvoiceModal;
