import React, {useState, useEffect, FC} from 'react';
import Styles from './create-invoice-mobile-details.styles';
import {useInvoiceForm} from "../../../create-invoice.context";
import {createInvoiceSteps, InvoiceFormType} from "../../../create-invoice.data";
import {FormikHelpers, FormikProps, Formik, Form} from "formik";
import * as Yup from "yup";
import FormRow from "../../../../../components/forms/form-row/form-row.component";
import FormDatepicker from "../../../../../components/forms/form-datepicker/form-datepicker.component";
import moment from "moment";
import FormSelect from "../../../../../components/forms/form-select/form-select.component";
import {paymentMethodsOptions} from "../../../../../enums/payment-method.enum";
import CreateInvoiceSection from "../../../components/create-invoice-section/create-invoice-section.component";
import CreateInvoiceMobileActions from "../create-invoice-mobile-actions/create-invoice-mobile-actions.component";

type Props = {};
const CreateInvoiceMobileDetails: FC<Props> = ({}) => {
    const {values, setValues, setStep} = useInvoiceForm();
    const handleSubmit = (formValues: InvoiceFormType, helper: FormikHelpers<InvoiceFormType>) => {
        setValues(formValues);
        setStep(createInvoiceSteps.ITEMS);
        helper.setSubmitting(false);
    }
    return (
        <Styles>
            <Formik initialValues={values} onSubmit={handleSubmit}
                    isInitialValid={false}
                    enableReinitialize
                    validationSchema={Yup.object({
                        invoice: Yup.object({
                            due_on: Yup.date().required().future(),
                        })
                    })}
            >
                {
                    (formik: FormikProps<InvoiceFormType>) => (
                        <Form>
                            <CreateInvoiceSection title={'Set the Invoice Details'}>
                                <FormRow>
                                    <FormDatepicker label={'Issuance Date'} name={'invoice.issuance_date'} disabled
                                                    disabledDate={date => date.isBefore(moment().startOf("day"))}/>
                                    <FormDatepicker label={'Due Date'} name={'invoice.due_on'}
                                                    disabledDate={date => date.isBefore(moment().startOf("day"))}/>
                                    {/*<FormSelect label={'Currency'} name={'invoice.currency_code'}*/}
                                    {/*            options={[{label: 'AED', value: "AED"}]}/>*/}
                                    <FormSelect label={"Payment Method"} name={'invoice.payment_method'}
                                                options={paymentMethodsOptions}/>
                                </FormRow>
                            </CreateInvoiceSection>
                            <CreateInvoiceMobileActions back={createInvoiceSteps.CLIENT}/>
                        </Form>
                    )
                }
            </Formik>
        </Styles>
    );
};

export default CreateInvoiceMobileDetails;
