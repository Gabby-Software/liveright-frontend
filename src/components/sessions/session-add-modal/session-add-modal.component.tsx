import React from 'react';
import Styles from './session-add-modal.styles';
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {Session} from "../../../types/session.type";
import {Form, Formik, FormikHelpers} from "formik";
import * as Yup from 'yup';
import Modal from "../../modal/modal.component";
import moment from "moment";
import FormSelect from "../../forms/form-select/form-select.component";
import {sessionTypeOptions} from "../../../enums/session-filters.enum";
import FormDatepicker from "../../forms/form-datepicker/form-datepicker.component";
import FormTimepicker from "../../forms/form-timepicker/form-timepicker.component";
import ButtonSubmit from "../../forms/button-submit/button-submit.component";
import {useDispatch, useSelector} from "react-redux";
import {
  ACTION_CLIENT_REQUEST_SESSION_REQUEST,
} from "../../../store/action-types";
import {RootState} from "../../../store/reducers";

interface FormValues {
  type: Session;
  date: string;
  duration: string;
  time: string;
}

const initialValues: FormValues = {
    type: 'Paid PT',
    date: '',
    duration: '',
    time: '',
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  trainer_id: number;
};

const SessionAddModal: React.FC<Props> = (props) => {
    const {isOpen, onClose, trainer_id} = props;
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const handleSubmit = (values: FormValues, helper: FormikHelpers<FormValues>) => {
      const {type, date, duration, time} = values

        dispatch({
          type: ACTION_CLIENT_REQUEST_SESSION_REQUEST,
          payload: {
            type,
            client_request: {
              date,
              duration: moment(duration, "h:mm").format("HH:mm:ss"),
              time: moment(time, "h:mm").format("HH:mm:ss"),
            },
            trainer_id
          }
        });

        helper.setSubmitting(false);
        onClose();
    };

    return (
        <Modal visible={isOpen} onCancel={onClose}>
            <Modal.Title>{t('sessions:session-request')}</Modal.Title>
            <Formik onSubmit={handleSubmit} initialValues={initialValues}
                    validationSchema={Yup.object({
                        date: Yup.date().min(moment().startOf('day')).required(),
                        time: Yup.string().required(),
                        duration: Yup.string().required(),
                        type: Yup.string().required()
                    })}>
                <Form>
                    <Styles>
                        <FormSelect name={'type'} label={t('sessions:type')} options={sessionTypeOptions}/>
                        <FormDatepicker name={'date'} label={t('sessions:date')}/>
                        <FormTimepicker name={'time'} label={t('sessions:time')}/>
                        <FormTimepicker name={'duration'} label={t('sessions:duration')}/>
                        <ButtonSubmit>{t('submit')}</ButtonSubmit>
                    </Styles>
                </Form>
            </Formik>
        </Modal>
    )
};

export default SessionAddModal;
