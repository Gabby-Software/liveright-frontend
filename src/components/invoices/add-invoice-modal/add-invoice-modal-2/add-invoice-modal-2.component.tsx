import React, {useState, useEffect, useContext} from 'react';
import Styles from './add-invoice-modal-2.styles';
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {InvoiceContext} from "../add-invoice-modal.context";
import {InvoiceFormType} from "../../../../types/invoice-form.type";
import {FormikHelpers, Formik, Form} from "formik";
import * as Yup from 'yup';
import FormInputLabeled from "../../../forms/form-input-labeled/form-input-labeled.component";
import FormTextarea from "../../../forms/form-textarea/form-textarea.component";
import ButtonSubmit from "../../../forms/button-submit/button-submit.component";


const AddInvoiceModal2 = () => {
    const {t} = useTranslation();
    const {form, update, onClose} = useContext(InvoiceContext);
    const handleSubmit = (values: InvoiceFormType, helper: FormikHelpers<InvoiceFormType>) => {
        // todo: handle submit
        helper.setSubmitting(false);
        helper.resetForm();
        onClose();
    };
    return (
        <Styles>
            <Formik
                onSubmit={handleSubmit}
                initialValues={form}
                validationSchema={Yup.object({
                    price: Yup.number().min(0.01),
                    discount: Yup.number().min(0),
                    description: Yup.string()
                })}
            >
                <Form>
                    <FormInputLabeled name={'price'} label={t('invoices:price') + ' (USD)'} type={'number'} onUpdate={update}/>
                    <FormInputLabeled name={'discount'} label={t('invoices:discount')} type={'number'} onUpdate={update}/>
                    <div className={'add-invoice__data'}>
                        <div className={'add-invoice__data__label'}>{t('invoices:tax')}</div>
                        <div className={'add-invoice__data__value'}>{13}%</div>
                    </div>
                    <FormTextarea name={'description'} label={t('invoices:notes')} onUpdate={update}/>
                    <ButtonSubmit>{t('submit')}</ButtonSubmit>
                </Form>
            </Formik>
        </Styles>
    )
};

export default AddInvoiceModal2;
