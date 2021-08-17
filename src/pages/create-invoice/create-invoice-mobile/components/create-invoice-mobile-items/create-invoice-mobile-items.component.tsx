import React, {useState, useEffect} from 'react';
import Styles from './create-invoice-mobile-items.styles';
import {useInvoiceForm} from "../../../create-invoice.context";
import {createInvoiceSteps, defaultInvoiceItem, InvoiceFormType} from "../../../create-invoice.data";
import {Formik, Form, FormikHelpers, FormikProps, FieldArray, ArrayHelpers} from "formik";
import * as Yup from "yup";
import CreateInvoiceSection from "../../../components/create-invoice-section/create-invoice-section.component";
import CreateInvoiceItem from "../../../components/create-invoice-item/create-invoice-item.component";
import FormButton from "../../../../../components/forms/form-button/form-button.component";
import CreateInvoiceMobileActions from "../create-invoice-mobile-actions/create-invoice-mobile-actions.component";

type Props = {};
const CreateInvoiceMobileItems = ({}:Props) => {
    const {values, setValues, setStep} = useInvoiceForm();
    const handleSubmit = (formValues: InvoiceFormType, helper: FormikHelpers<InvoiceFormType>) => {
        setValues(formValues);
        setStep(createInvoiceSteps.NOTES);
        helper.setSubmitting(false);
    }
    return (
        <Formik initialValues={values} onSubmit={handleSubmit}
                isInitialValid={false}
                enableReinitialize
                validationSchema={Yup.object({
                    items: Yup.array(Yup.object({
                        quantity: Yup.number().required().min(1),
                        unit_price: Yup.number().required().min(1),
                        discount: Yup.number().min(0).max(100),
                        tax_rate: Yup.number().min(0).max(100)
                    }))
                })}
        >
            {
                (formik: FormikProps<InvoiceFormType>) => {
                    let credits = 0;
                    return (
                        <Form>
                            <CreateInvoiceSection title={'Add Items'}>
                                <FieldArray name={'items'}>

                                    {
                                        (helpers: ArrayHelpers) => (
                                            <>
                                                {formik.values.items.map((item, i) => (
                                                    <CreateInvoiceItem i={i} form={formik} helper={helpers}
                                                                       item={item} key={i} credits={item.type === 'PT session'?credits+=(+item.quantity):credits}/>
                                                ))}
                                                <FormButton type={'default'} className={'add-invoice__add-item'}
                                                            onClick={() => helpers.push({...defaultInvoiceItem})}>Add
                                                    another</FormButton>
                                            </>
                                        )
                                    }
                                </FieldArray>
                            </CreateInvoiceSection>
                            <CreateInvoiceMobileActions back={createInvoiceSteps.NOTES}/>
                        </Form>
                    )
                }
            }
        </Formik>
    )
};

export default CreateInvoiceMobileItems;
