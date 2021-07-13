import React, {useState, useEffect} from 'react';
import Styles from './session-reschedule-modal.styles';
import Modal from "../../modal/modal.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {sessions} from "../../../pages/sessions/sessions.data";
import {SessionType} from "../../../types/session.type";
import {Formik, Form, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import FormDatepicker from "../../forms/form-datepicker/form-datepicker.component";
import FormTimepicker from "../../forms/form-timepicker/form-timepicker.component";
import ButtonSubmit from "../../forms/button-submit/button-submit.component";

type Props = {
    onClose: () => void;
    sessionId: number;
};
type RescheduleFormType = {
    date: string;
    time: string;
}
const SessionRescheduleModal = ({sessionId, onClose}: Props) => {
    const {t} = useTranslation();
    if (!sessionId) return null;
    const session = sessions.find(s => s.id === sessionId) as SessionType;
    const initialValues: RescheduleFormType = {
        date: session.date,
        time: session.time
    };
    const handleSubmit = (values: RescheduleFormType, helper: FormikHelpers<RescheduleFormType>) => {
        // todo: handle form submit;
        helper.setSubmitting(false);
        onClose();
    };
    return (
        <Modal visible={!!sessionId} onCancel={onClose}>
            <Modal.Title>{t('sessions:reschedule')}</Modal.Title>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}
                    validationSchema={Yup.object({
                        date: Yup.date().min(moment().startOf('day')).required(),
                        time: Yup.string().required()
                    })}
            >
                <Form>
                    <Styles>
                        <FormDatepicker name={'date'} label={t('sessions:date')}/>
                        <FormTimepicker name={'time'} label={t('sessions:time')}/>
                        <ButtonSubmit>{t('submit')}</ButtonSubmit>
                    </Styles>
                </Form>
            </Formik>
        </Modal>
    );
};

export default SessionRescheduleModal;
