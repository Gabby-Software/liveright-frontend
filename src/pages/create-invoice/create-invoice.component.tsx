import React, {useState, useEffect, useRef, useMemo} from 'react';
import Styles, {SubmitLabel} from './create-invoice.styles';
import Modal from "../../components/modal/modal.component";
import {ArrayHelpers, FieldArray, Form, Formik, FormikHelpers, FormikProps} from "formik";
import * as Yup from "yup";
import FormRow from "../../components/forms/form-row/form-row.component";
import FormClientSelect from "../../components/forms/form-client-select/form-client-select.component";
import FormDatepicker from "../../components/forms/form-datepicker/form-datepicker.component";
import moment from "moment";
import FormTextarea from "../../components/forms/form-textarea/form-textarea.component";
import FormSelect from "../../components/forms/form-select/form-select.component";
import FormInputLabeled from "../../components/forms/form-input-labeled/form-input-labeled.component";
import formatter from "../../managers/formatter.manager";
import FormButton from "../../components/forms/form-button/form-button.component";
import DataTable from "../../components/data-table/data-table.component";
import {asPrice} from "../../pipes/price.pipe";
import ButtonSubmit from "../../components/forms/button-submit/button-submit.component";
import {useDispatch, useSelector} from "react-redux";
import {useIsMobile} from "../../hooks/is-mobile.hook";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {RootState} from "../../store/reducers";
import {OptionType} from "../../types/option.type";
import {ACTION_CREATE_INVOICE_REQUEST} from "../../store/action-types";
import {handleError} from "../../managers/api.manager";
import {useTitleContent} from "../../layouts/desktop-layout/desktop-layout.component";
import logger from "../../managers/logger.manager";
import CreateInvoiceSection from "./components/create-invoice-section/create-invoice-section.component";
import CreateInvoiceClientCard from "./components/create-invoice-client-card/create-invoice-client-card.component";
import {AccountObjType} from "../../types/account.type";
import {paymentMethods, paymentMethodsOptions} from "../../enums/payment-method.enum";
import Card from "../../components/card/card.style";
import CreateInvoiceItem from "./components/create-invoice-item/create-invoice-item.component";
import {forOf} from "../../pipes/for-of.pipe";
import {Redirect, useHistory} from "react-router-dom";
import {Routes} from "../../enums/routes.enum";
import {useLocation} from "react-router";

type Props = {};
export type InvoiceItemType = {
    "name": string,
    "description": string,
    "type": string,
    "is_taxable": boolean,
    "quantity": number,
    "unit_price": number,
    "tax_rate": number,
    "discount_percent": number,
    "extras": {
        "session_expires_on": string
    }
}
export type InvoiceFormType = {
    invoice: {
        "type": string,
        "invoice_to": string,
        "currency_code": string,
        "due_on": string,
        "is_taxable": boolean,
        "payment_method": string;
        "send_to_client":boolean;
        "issuance_date"?:string;
    },
    items: InvoiceItemType[],

};
const defaultInvoiceItem: InvoiceItemType = {
    type: 'PT session',
    description: '',
    name: "",
    is_taxable: true,
    quantity: 1,
    unit_price: 1,
    tax_rate: 0,
    discount_percent: 0,
    extras: {
        session_expires_on: moment().format("YYYY-MM-DD"),
    }
};
const initialValues: InvoiceFormType = {
    invoice: {
        type: "Trainer Invoice",
        invoice_to: '',
        currency_code: "AED",
        due_on: moment().format("YYYY-MM-DD"),
        issuance_date: moment().format("YYYY-MM-DD"),
        is_taxable: true,
        payment_method: paymentMethods.CREDIT_CARD,
        send_to_client: false
    },
    items: [{...defaultInvoiceItem}],
}
const CreateInvoice = ({}: Props) => {
    const dispatch = useDispatch();
    const isMobile = useIsMobile();
    const {t} = useTranslation();
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [client, setClient] = useState<AccountObjType | null>(null);
    const {meta, data} = useSelector((state: RootState) => state.invoices);
    const location = useLocation();
    const history = useHistory();
    const initialFormValues = useMemo(() => {
        const params = new URLSearchParams(location.search);
        initialValues.invoice.invoice_to = params.get('cid')||'';
        initialValues.invoice.type = params.get('type') || 'PT session';
        return initialValues;
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
    if (isMobile)
        return null;
    return (
        <Styles>
            <Formik initialValues={initialFormValues} onSubmit={handleSubmit}
                    isInitialValid={false}
                    validationSchema={Yup.object({
                        invoice: Yup.object({
                            due_on: Yup.date().future(),
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
                                <div className={'create-invoice__cont'}>
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
                                            <div/>
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
                                            <FormSelect label={'Currency'} name={'invoice.currency_code'}
                                                        options={[{label: 'AED', value: "AED"}]}/>
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

export default CreateInvoice;
