import React, {useState, useEffect, useMemo} from 'react';
import Styles from './session-reschedule-modal.styles';
import Modal from "../../modal/modal.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {sessions} from "../../../pages/sessions/sessions.data";
import {SessionType} from "../../../types/session.type";
import {Formik, Form, FormikHelpers, Field, FieldProps} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import FormDatepicker from "../../forms/form-datepicker/form-datepicker.component";
import FormTimepicker from "../../forms/form-timepicker/form-timepicker.component";
import ButtonSubmit from "../../forms/button-submit/button-submit.component";
import FormRow from "../../forms/form-row/form-row.component";
import PrimaryLabel from "../../primary-label/primary-label.component";
import {ReactComponent as CalendarIcon} from "../../../assets/media/icons/calendar.svg";
import {ReactComponent as ClockIcon} from "../../../assets/media/icons/clock.svg";
import {date} from "../../../pipes/date.pipe";
import {Link} from "react-router-dom";
import {Routes} from "../../../enums/routes.enum";
import {useIsMobile} from "../../../hooks/is-mobile.hook";
import BottomDrawer from "../../bottom-drawer/bottom-drawer.component";
import {hour} from "../../../pipes/hour.pipe";
import logger from "../../../managers/logger.manager";

type Props = {
    onClose: () => void;
    session: SessionType | null;
};
type RescheduleFormType = {
    date: string;
    time: string;
}
const SessionRescheduleModal = ({session, onClose}: Props) => {
    const {t} = useTranslation();
    const isMobile = useIsMobile();
    const Wrapper = useMemo(() => (
        !isMobile ? (({children}:{children:React.ReactNode}) =>
            <Modal visible={!!session} onCancel={onClose}>{children}</Modal>)
            : (
                ({children}:{children:React.ReactNode}) =>
                        <BottomDrawer isOpen={!!session} onClose={onClose}>
                            <BottomDrawer.Body>
                            {children}
                            </BottomDrawer.Body>
                        </BottomDrawer>
            )
    ), [isMobile, session, onClose]);
    if (!session) return null;
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
        <Wrapper>
            <Modal.Title>{t('sessions:reschedule')}</Modal.Title>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}
                    validationSchema={Yup.object({
                        date: Yup.date().min(moment().startOf('day')).required(),
                        time: Yup.string().required()
                    })}
            >
                <Form>
                    <Styles>
                        <div className={'reschedule__current'}>
                            <PrimaryLabel className={'reschedule__current__label'}>{t('sessions:currently')}</PrimaryLabel>
                            <div className={'reschedule__current__item'}>
                                <CalendarIcon/>
                                <span>{date(session.date)}</span>
                            </div>
                            <div className={'reschedule__current__item'}>
                                <ClockIcon/>
                                <span>{session.time}</span>
                            </div>
                        </div>
                        <FormRow>
                        <FormDatepicker name={'date'} label={t('sessions:date')}/>
                        <FormTimepicker name={'time'} label={t('sessions:time')}/>
                        </FormRow>
                        {
                            <Field name={'time'}>
                                {
                                    ({field, form}:FieldProps) => (
                                        hour(field.value as string)%2===0 ? (
                                            <div className={'reschedule__warning'}>
                                                {logger.info('time', field.value)}
                                                <span>{t('sessions:reschedule-warning')}</span>
                                                <Link to={Routes.CALENDAR}>{t('sessions:go-to-calendar')}</Link>
                                            </div>
                                        ) :null
                                    )
                                }
                            </Field>
                        }
                        <ButtonSubmit>{t('submit')}</ButtonSubmit>
                    </Styles>
                </Form>
            </Formik>
        </Wrapper>
    );
};

export default SessionRescheduleModal;
