import React from 'react';
import Styles from './create-invoice-mobile-notes.styles';
import {useInvoiceForm} from "../../../create-invoice.context";
import {InvoiceFormType} from "../../../create-invoice.data";
import {Formik, Form, FormikHelpers, FormikProps} from "formik";
import CreateInvoiceSection from "../../../components/create-invoice-section/create-invoice-section.component";
import FormTextarea from "../../../../../components/forms/form-textarea/form-textarea.component";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import FormButton from "../../../../../components/forms/form-button/form-button.component";
import logger from "../../../../../managers/logger.manager";
import {ACTION_CREATE_INVOICE_REQUEST} from "../../../../../store/action-types";
import {Routes} from "../../../../../enums/routes.enum";
import {handleError} from "../../../../../managers/api.manager";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import CreateInvoiceMobileClientView
    from "../create-invoice-mobile-client-view/create-invoice-mobile-client-view.component";
import CreateInvoiceMobileDetailsView
    from "../create-invoice-mobile-details-view/create-invoice-mobile-details-view.component";
import CreateInvoiceMobileItemsView
    from "../create-invoice-mobile-items-view/create-invoice-mobile-items-view.component";

type Props = {};
const CreateInvoiceMobileNotes = ({}: Props) => {
    const {values, setValues, setStep} = useInvoiceForm();
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const handleSubmit = (values: InvoiceFormType, helper: FormikHelpers<InvoiceFormType>) => {
        logger.info('SUBMITTING', values);
        setValues(values);
        dispatch({
            type: ACTION_CREATE_INVOICE_REQUEST, payload: {
                ...values,
                items: values.items.map((item) => ({
                    ...item,
                    tax_rate: item.tax_rate||0,
                    discount_percent: item.discount_percent||0
                })),
                onSuccess: (id:number) => {
                    helper.setSubmitting(false);
                    helper.resetForm();
                    history.push(Routes.INVOICES+`/${id}`)
                },
                onError: handleError(helper)
            }
        });
    }
    return (
        <Styles>
            <CreateInvoiceMobileClientView/>
            <CreateInvoiceMobileDetailsView/>
            <CreateInvoiceMobileItemsView/>
            <Formik initialValues={values} onSubmit={handleSubmit}
                    enableReinitialize
            >
                {
                    (formik: FormikProps<InvoiceFormType>) => (
                        <Form>
                            <CreateInvoiceSection title={'Add Notes'}>
                                <FormTextarea name={'invoice.description'} label={'Notes'}/>
                            </CreateInvoiceSection>
                            <FormButton type={'primary'} disabled={!formik.isValid || !values.items.length}
                                        className={'add-invoice__submit'} htmlType={'submit'}
                                        onClick={() => formik.setFieldValue('invoice.send_to_client', true)}
                                        id={'btn-submit-invoice'}>{t("invoices:create.generate-and-send")}</FormButton>
                            <FormButton type={'default'} disabled={!formik.isValid || !values.items.length}
                                        className={'add-invoice__submit'} htmlType={'submit'}
                                        onClick={() => formik.setFieldValue('invoice.send_to_client', false)}
                                        id={'btn-submit-invoice-back'}>{t("invoices:create.generate-and-back")}</FormButton>
                        </Form>
                    )
                }
            </Formik>
        </Styles>
    );
};

export default CreateInvoiceMobileNotes;
