import React, {useState, useEffect, useMemo} from 'react';
import Styles from './create-invoice-desktop.styles';
import {useDispatch, useSelector} from "react-redux";
import {useIsMobile} from "../../../hooks/is-mobile.hook";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {useClients} from "../../../hooks/clients.hook";
import {AccountObjType} from "../../../types/account.type";
import {RootState} from "../../../store/reducers";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";
import {createInvoiceInitialValues, defaultInvoiceItem, InvoiceFormType} from "../create-invoice.data";
import {SubmitLabel} from "../create-invoice.styles";
import FormButton from "../../../components/forms/form-button/form-button.component";
import {useTitleContent} from "../../../layouts/desktop-layout/desktop-layout.component";
import {ArrayHelpers, FieldArray, Form, Formik, FormikHelpers, FormikProps} from "formik";
import logger from "../../../managers/logger.manager";
import {ACTION_CREATE_INVOICE_REQUEST} from "../../../store/action-types";
import {Routes} from "../../../enums/routes.enum";
import {handleError} from "../../../managers/api.manager";
import * as Yup from "yup";
import CreateInvoiceSection from "../components/create-invoice-section/create-invoice-section.component";
import FormRow from "../../../components/forms/form-row/form-row.component";
import CreateInvoiceClientCard from "../components/create-invoice-client-card/create-invoice-client-card.component";
import FormClientSelect from "../../../components/forms/form-client-select/form-client-select.component";
import Link from "../../../components/link/link.component";
import FormDatepicker from "../../../components/forms/form-datepicker/form-datepicker.component";
import moment from "moment";
import FormSelect from "../../../components/forms/form-select/form-select.component";
import {paymentMethodsOptions} from "../../../enums/payment-method.enum";
import CreateInvoiceItem from "../components/create-invoice-item/create-invoice-item.component";
import FormTextarea from "../../../components/forms/form-textarea/form-textarea.component";
import CreateInvoiceSummary from "../components/create-invoice-summary/create-invoice-summary.component";

type Props = {};
const CreateInvoiceDesktop = ({}:Props) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const clients = useClients();
    const [client, setClient] = useState<AccountObjType | null>(null);
    const {meta, data} = useSelector((state: RootState) => state.invoices);
    const location = useLocation();
    const history = useHistory();
    const initialFormValues = useMemo(() => {
        const params = new URLSearchParams(location.search);
        const cid = params.get('cid');
        createInvoiceInitialValues.invoice.invoice_to = cid||'';
        createInvoiceInitialValues.invoice.type = params.get('type') || 'PT session';
        setClient(clients.data.data.find((it) => it.id === +(cid||0)) || null);
        return createInvoiceInitialValues;
    },[]);
    const TitleContent = () => (
        <SubmitLabel>
            <FormButton type={'primary'}
                        loading={isLoading}
                        disabled={!isValid}
            >
                <label htmlFor={'btn-submit-invoice'}>{t('invoices:create.generate-and-send')}</label>
            </FormButton>
            <FormButton type={'default'}
                        loading={isLoading || isLoading}
                        disabled={!isValid || isLoading}
            >
                <label htmlFor={'btn-submit-invoice-back'}>{t('invoices:create.generate-and-back')}</label>
            </FormButton>
        </SubmitLabel>
    );
    useTitleContent(<TitleContent/>);
    const handleSubmit = (values: InvoiceFormType, helper: FormikHelpers<InvoiceFormType>) => {
        logger.info('SUBMITTING', values);
        dispatch({
            type: ACTION_CREATE_INVOICE_REQUEST, payload: {
                ...values,
                items: values.items.map((item) => ({
                    ...item,
                    tax_rate: item.tax_rate||0,
                    discount_percent: item.discount_percent||0
                })),
                params: {
                    page: meta?.current_page || 1,
                    include: "invoiceTo"
                },
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
            <Formik initialValues={initialFormValues} onSubmit={handleSubmit}
                    isInitialValid={false}
                    validationSchema={Yup.object({
                        invoice: Yup.object({
                            due_on: Yup.date().required().future(),
                            invoice_to: Yup.string().required()
                        }),
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
                        const {values, setFieldValue, setFieldError, isSubmitting, errors, isValid} = formik;
                        setIsValid(Boolean(isValid && values.items.length));
                        setIsLoading(isSubmitting);
                        let credits = 0;
                        logger.info('FORM', formik);
                        return (
                            <Form>
                                <div className={'add-invoice__cont'}>
                                    <CreateInvoiceSection title={'Select who should receive the invoice'}>
                                        <FormRow>
                                            {
                                                client ? (
                                                    <CreateInvoiceClientCard client={client} onRemove={() => {
                                                        setClient(null);
                                                        setFieldValue('invoice.invoice_to', '');
                                                    }}/>
                                                ) : (
                                                    <FormClientSelect name={'invoice.invoice_to'}
                                                                      label={'Search Existing Clients'}
                                                                      onUpdate={setClient}/>
                                                )
                                            }
                                            <div className={'add-invoice__add-client'}>
                                                {
                                                    client?null:(
                                                        <Link to={Routes.CLIENTS+'/?add=1'}>{'or add new one'}</Link>
                                                    )
                                                }
                                            </div>
                                            <div/>
                                            <div/>
                                        </FormRow>
                                    </CreateInvoiceSection>
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
                                    <CreateInvoiceSection title={'Add Items'}>
                                        <FieldArray name={'items'}>

                                            {
                                                (helpers: ArrayHelpers) => (
                                                    <>
                                                        {values.items.map((item, i) => (
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
                                        <CreateInvoiceSummary items={values.items}/>
                                    </CreateInvoiceSection>
                                    <CreateInvoiceSection title={'Add Notes'}>
                                        <FormTextarea name={'invoice.description'} label={'Notes'}/>
                                    </CreateInvoiceSection>
                                </div>
                                <div className={'add-invoice__submit__cont'}>
                                    <FormButton type={'primary'} disabled={!formik.isValid || !values.items.length}
                                                className={'add-invoice__submit'} htmlType={'submit'}
                                                onClick={() => formik.setFieldValue('invoice.send_to_client', true)}
                                                id={'btn-submit-invoice'}>{t("invoices:create.generate-and-send")}</FormButton>
                                    <FormButton type={'default'} disabled={!formik.isValid || !values.items.length}
                                                className={'add-invoice__submit'} htmlType={'submit'}
                                                onClick={() => formik.setFieldValue('invoice.send_to_client', false)}
                                                id={'btn-submit-invoice-back'}>{t("invoices:create.generate-and-back")}</FormButton>
                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>
        </Styles>
    );
};

export default CreateInvoiceDesktop;
