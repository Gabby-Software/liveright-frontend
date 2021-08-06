import React, {useState, useEffect} from 'react';
import Styles from './create-invoice.styles';
import {useDispatch, useSelector} from "react-redux";
import {useIsMobile} from "../../../../hooks/is-mobile.hook";
import Modal from "../../../../components/modal/modal.component";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {Form, FormikHelpers, Formik, FieldArray, ArrayHelpers, FormikProps} from "formik";
import moment from "moment";
import FormRow from '../../../../components/forms/form-row/form-row.component';
import FormSelect from "../../../../components/forms/form-select/form-select.component";
import FormClientSelect from "../../../../components/forms/form-client-select/form-client-select.component";
import FormDatepicker from "../../../../components/forms/form-datepicker/form-datepicker.component";
import FormTextarea from "../../../../components/forms/form-textarea/form-textarea.component";
import * as Yup from 'yup';
import ButtonSubmit from "../../../../components/forms/button-submit/button-submit.component";
import {serviceTypeOptions} from "../../../../enums/service-type.enum";
import FormInputLabeled from "../../../../components/forms/form-input-labeled/form-input-labeled.component";
import {number} from "../../../../pipes/number.pipe";
import formatter from "../../../../managers/formatter.manager";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import DataTable from "../../../../components/data-table/data-table.component";
import {asPrice} from "../../../../pipes/price.pipe";
import {ACTION_CREATE_INVOICE_REQUEST, ACTION_GET_INVOICES_REQUEST} from "../../../../store/action-types";
import {handleError} from "../../../../managers/api.manager";
import {OptionType} from "../../../../types/option.type";
import {RootState} from "../../../../store/reducers";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};
type InvoiceItemType = {
    "name": string,
    "description": string,
    "type": string,
    "is_taxable": boolean,
    "quantity": number,
    "unit_price": number,
    "tax_rate": number,
    "discount_percent": number
}
export type InvoiceFormType = {
    invoice: {
        "type": string,
        "invoice_to": string,
        "currency_code": string,
        "due_on": string,
        "is_taxable": boolean
    },
    items: InvoiceItemType[],
    current: InvoiceItemType
};
const defaultInvoiceItem: InvoiceItemType = {
    type: 'PT Session',
    description: '',
    name: "",
    is_taxable: true,
    quantity: 1,
    unit_price: 0,
    tax_rate: 0,
    discount_percent: 0
};
const initialValues: InvoiceFormType = {
    invoice: {
        type: "Trainer Invoice",
        invoice_to: '',
        currency_code: "AED",
        due_on: moment().format("Y-MM-DD"),
        is_taxable: true
    },
    items: [],
    current: {...defaultInvoiceItem}
}
const CreateInvoice = ({isOpen, onClose}: Props) => {
    const dispatch = useDispatch();
    const isMobile = useIsMobile();
    const {t} = useTranslation();
    const [descriptionOpen, setDescriptionOpen] = useState(false);
    const {meta, data} = useSelector((state: RootState) => state.invoices);
    const typeOptions: OptionType[] = [
        {label: 'PT session', value: 'PT session'},
        {label: 'Coaching session', value:'Coaching session'},
        {label: 'Complimentary session', value: 'Complimentary session'},
    ];
    const handleSubmit = (values: InvoiceFormType, helper: FormikHelpers<InvoiceFormType>) => {
        dispatch({
            type: ACTION_CREATE_INVOICE_REQUEST, payload: {
                ...values,
                params: {
                    page: meta.current_page,
                    include: "invoiceTo"
                },
                onSuccess: () => {
                    helper.setSubmitting(false);
                    helper.resetForm();
                    onClose();
                },
                onError: handleError(helper)
            }
        });
    }
    const addItem = (item: InvoiceItemType, helper: ArrayHelpers, setFieldValue: any, setFieldsError: any) => {
        let valid = true;
        if (!item.type) {
            valid = false;
            setFieldsError('current.type', t('errors:required-field'));
        }
        if (!item.name) {
            valid = false;
            setFieldsError('current.name', t('errors:required-field'));
        }
        if (!item.quantity) {
            valid = false;
            setFieldsError('current.quantity', t('errors:required-field'));
        }
        if (!item.unit_price) {
            valid = false;
            setFieldsError('current.unit_price', t('errors:required-field'));
        }
        if (!valid) return;
        helper.push({
            ...item,
            tax_rate: item.tax_rate || '0',
            discount_percent: item.discount_percent || '0'
        });
        setFieldValue('current', {...defaultInvoiceItem});
    }
    if (isMobile)
        return null;
    return (
        <Modal visible={isOpen} onCancel={onClose} large>
            <Styles>
                <Modal.Title>{t("invoices:add")}</Modal.Title>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}
                        validationSchema={Yup.object({
                            invoice: Yup.object({
                                due_on: Yup.date().future(),
                                invoice_to: Yup.string().required()
                            }),
                            current: Yup.object({}),
                        })}>
                    {
                        ({values, setFieldValue, setFieldError}: FormikProps<InvoiceFormType>) => (
                            <Form>
                                <FormRow>
                                    <FormClientSelect name={'invoice.invoice_to'}
                                                      label={t('invoices:create.recipient')}/>
                                    <FormDatepicker name={"invoice.due_on"} label={t('invoices:create.due_date')}
                                                    disabledDate={date => date.isBefore(moment().startOf("day"))}/>
                                    <div/>
                                    <div/>
                                </FormRow>
                                <FormRow>
                                    {
                                        descriptionOpen ? (
                                            <div>
                                                <FormTextarea name={'invoice.description'}
                                                              label={t("invoices:create.description")}/>
                                                <p className={"add-invoice__action"}
                                                   onClick={() => setDescriptionOpen(false)}>{t("invoices:create.remove-description")}</p>
                                            </div>
                                        ) : <p className={"add-invoice__action"}
                                               onClick={() => setDescriptionOpen(true)}>{t("invoices:create.add-description")}</p>
                                    }
                                    <div/>
                                </FormRow>
                                <FieldArray name={'items'}>
                                    {
                                        (arrayHelpers: ArrayHelpers) => (
                                            <>
                                                <FormRow>
                                                    <FormSelect name={'current.type'} label={t("invoices:create.type")}
                                                                options={typeOptions}/>
                                                    <FormInputLabeled name={'current.name'} label={t('invoices:create.name')}/>
                                                    <FormInputLabeled format={formatter().number().min(1)}
                                                                      name={'current.quantity'}
                                                                      label={t("invoices:create.quantity")}/>
                                                    <FormInputLabeled format={formatter().number().min(0)}
                                                                      name={"current.unit_price"}
                                                                      label={t('invoices:create.price')}/>
                                                    <FormInputLabeled format={formatter().number().min(0).max(100)}
                                                                      name={'current.tax_rate'}
                                                                      label={t('invoices:create.tax')}/>
                                                    <FormInputLabeled format={formatter().number().min(0).max(100)}
                                                                      name={'current.discount_percent'}
                                                                      label={t('invoices:create.discount')}/>
                                                </FormRow>
                                                <FormRow>
                                                    <div/>
                                                    <div/>
                                                    <div/>
                                                    <div/>
                                                    <FormButton type={'link'}
                                                                onClick={() => addItem(values.current, arrayHelpers, setFieldValue, setFieldError)}
                                                    >{t("invoices:create.add")}</FormButton>
                                                </FormRow>
                                                <div className={'add-invoice__preview'}>
                                                    <h3>Invoice Preview</h3>
                                                    <DataTable
                                                        labels={["Item", "Name", "Quantity", "Unit Price", "Discount", "VAT", "Subtotal"]}
                                                        data={values.items}
                                                        keys={["type", "name", "quantity", "unit_price", "discount", "tax_rate", "subtotal"]}
                                                        render={{
                                                            discount: ({discount_percent}) => `${discount_percent}%`,
                                                            tax_rate: ({tax_rate}) => `${tax_rate}%`,
                                                            subtotal: ({
                                                                           unit_price,
                                                                           quantity,
                                                                           discount_percent
                                                                       }) => `${asPrice(unit_price * quantity)} AED`,
                                                        }}
                                                    >
                                                        <tr>
                                                            <td colSpan={5} rowSpan={4}/>
                                                            <td>
                                                                <span className={'add-invoice__label'}>Subtotal</span>
                                                            </td>
                                                            <td>
                                                                <span className={'add-invoice__value'}>{values.items.reduce((a,b) => (a+b.unit_price*b.quantity),0)} AED</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <span className={'add-invoice__label'}>Discount</span>
                                                            </td>
                                                            <td>
                                                                <span className={'add-invoice__value'}>-{asPrice(values.items.reduce((a,b) => (a+b.unit_price*b.quantity*b.discount_percent/100),0))} AED</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <span className={'add-invoice__label'}>VAT ({values.items.length&&asPrice(values.items.reduce((a,b) => (a+b.tax_rate),0)/values.items.length)}%)</span>
                                                            </td>
                                                            <td>
                                                                <span className={'add-invoice__value'}>{asPrice(values.items.reduce((a,b) => (a+b.unit_price*b.quantity*(1-b.discount_percent/100)*b.tax_rate/100),0))} AED</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <span className={'add-invoice__total'}>Total Payable</span>
                                                            </td>
                                                            <td>
                                                                <span className={'add-invoice__total add-invoice__value'}>{asPrice(values.items.reduce((a,b) => a+(b.unit_price*b.quantity)*(1-b.discount_percent/100)*(1+b.tax_rate/100),0))} AED</span>
                                                            </td>
                                                        </tr>
                                                    </DataTable>
                                                </div>
                                            </>
                                        )
                                    }
                                </FieldArray>
                                <FormRow>
                                    <div/>
                                    <div/>
                                    <div/>
                                    <div/>
                                    <ButtonSubmit disabled={!values.items.length}>{t("invoices:add")}</ButtonSubmit>
                                </FormRow>
                            </Form>
                        )
                    }
                </Formik>
            </Styles>
        </Modal>
    )
};

export default CreateInvoice;
