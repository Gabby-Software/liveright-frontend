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
import logger from "../../../managers/logger.manager";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};
const initialValues: InvoiceFormType = {
    due_date: date(new Date().toDateString()),
    service_type: 'PT Session',
    other: '',
    quantity: 1,
    session_expired: '',
    client_name: ''
};
const AddInvoiceModal = ({isOpen, onClose}: Props) => {
    const {t} = useTranslation();
    const handleSubmit = (values: InvoiceFormType, helper: FormikHelpers<InvoiceFormType>) => {
        // todo: handle submit
        helper.setSubmitting(false);
        helper.resetForm();
        onClose();
    };
    const serviceTypeOptions = Object.values(serviceTypes).map((type: string) => ({
        label: t(`invoices:service-type.${type}`), value: t(`invoices:service-type.${type}`)
    }));
    return (
        <Modal visible={isOpen} onCancel={onClose}>
            <Styles>
                <h1 className={'add-invoice__title'}>{t('invoices:add')}</h1>
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    validationSchema={Yup.object({
                        due_date: Yup.date().required().min(moment().startOf('day').toDate()),
                        quantity: Yup.number().min(1),
                        client_name: Yup.string().required(),
                        service_type: Yup.string(),
                        session_expired: Yup.string().when('service_type', {
                            is: (field: string) => field === t(`invoices:service-type.${serviceTypes.PT_SESSION}`),
                            then: Yup.string()
                        }),
                        other: Yup.string().when('service_type', {
                            is: (field: string) => field === t(`invoices:service-type.${serviceTypes.OTHER}`),
                            then: Yup.string().required()
                        })
                    })}
                >
                    {
                        (form: FormikProps<InvoiceFormType>) => (
                            <Form>
                                <FormDatepicker name={'due_date'} label={t('invoices:invoice-due')}/>
                                <FormRow>
                                    <FormSelect name={'service_type'} label={t('invoices:service-type.title')}
                                                options={serviceTypeOptions}/>
                                    {
                                        form.values.service_type === t(`invoices:service-type.${serviceTypes.PT_SESSION}`) ? (
                                            <FormInputLabeled name={'session_expired'}
                                                              label={t('invoices:session-expired')}/>
                                        ) : form.values.service_type === t(`invoices:service-type.${serviceTypes.OTHER}`) ? (
                                            <FormInputLabeled name={'other'} label={t('invoices:other')}/>
                                        ) : null
                                    }
                                </FormRow>
                                <FormInputLabeled name={'quantity'} label={t('invoices:quantity')} type={'number'}/>
                                <FormSelect name={'client_name'} label={t('invoices:client-name')}
                                            options={clients.map(({first_name, last_name}) => ({
                                                label: `${first_name} ${last_name}`,
                                                value: `${first_name} ${last_name}`
                                            }))}/>
                                <ButtonSubmit>{t('submit')}</ButtonSubmit>
                            </Form>
                        )
                    }
                </Formik>
            </Styles>
        </Modal>
    );
};

export default AddInvoiceModal;
