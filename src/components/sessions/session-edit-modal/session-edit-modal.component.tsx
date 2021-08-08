import React, {useState, useEffect} from 'react';
import Styles from './session-edit-modal.styles';
import {SessionType} from "../../../types/session.type";
import Modal from "../../modal/modal.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {Formik, Form, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import FormSelect from "../../forms/form-select/form-select.component";
import {OptionType} from "../../../types/option.type";
import {sessionTypeOptions} from "../../../enums/session-filters.enum";
import FormDatepicker from "../../forms/form-datepicker/form-datepicker.component";
import FormTimepicker from "../../forms/form-timepicker/form-timepicker.component";
import ButtonSubmit from "../../forms/button-submit/button-submit.component";

type Props = {
    session: SessionType | null;
    onClose: () => void;
};
const SessionEditModal = ({session, onClose}: Props) => {
    const {t} = useTranslation();
    if (!session) return null;
    const handleSubmit = (values: SessionType, helper: FormikHelpers<SessionType>) => {
        // todo: handle submit;
        helper.setSubmitting(false);
        onClose();
    };
    const clientOptions: OptionType[] = [
        {label: 'Moshe Sharet', value: '1'},
        {label: 'Galgalatz', value: '2'},
        {label: 'Chupma Chapma', value: '3'},
        {label: 'Miki Mouse', value: '4'},
        {label: 'Temp', value: "temp"}
    ];
    return (
        <Modal visible={!!session} onCancel={onClose}>
            <Modal.Title>{t('sessions:edit')}</Modal.Title>
            <Formik onSubmit={handleSubmit} initialValues={session}
                    validationSchema={Yup.object({
                        date: Yup.date().min(moment().startOf('day')),
                        name: Yup.string().required(),
                        time: Yup.string().required(),
                        type: Yup.string().required()
                    })}>
                <Form>
                    <Styles>
                        <FormSelect name={'name'} label={t('sessions:client-name')} options={clientOptions}/>
                        <FormSelect name={'type'} label={t('sessions:type')} options={sessionTypeOptions}/>
                        <FormDatepicker name={'date'} label={t('sessions:date')}/>
                        <FormTimepicker name={'time'} label={t('sessions:time')}/>
                        <ButtonSubmit>{t('submit')}</ButtonSubmit>
                    </Styles>
                </Form>
            </Formik>
        </Modal>
    );
};

export default SessionEditModal;
