import React, {useMemo} from 'react';
import {Form, Formik, FormikHelpers} from "formik";
import moment from "moment";
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {ACTION_EDIT_SESSIONS_REQUEST, ACTION_TRAINER_CREATE_SESSION_REQUEST} from "../../../../../store/action-types";
import {SessionType} from "../../../../../types/session.type";

export type AddSessionFormType = {
    type: string,
    date: string,
    duration: string,
    time: string,
    notes: string,
    client_id: number,
    session_id?: number,
}

const initialValuesEmpty: AddSessionFormType = {
    type: 'Paid PT',
    date: '',
    duration: '',
    time: '',
    notes: '',
    client_id: 0,
    session_id: 0,
};

type Props = {
    children:React.ReactNode,
    onClose: () =>void,
    session?: SessionType
};

const AddSessionForm = ({children, onClose, session}:Props) => {
    const dispatch = useDispatch();
    const initialValues: AddSessionFormType = useMemo(() => {
        if (session) {
            const {client_request} = session;
            const date = client_request?.date || moment(session.starts_at).format('YYYY-MM-DD');
            const duration = moment(client_request?.duration || session.duration, 'HH:mm:ss').format("HH:mm");
            const time = moment.utc(client_request?.time || session.starts_at).format("HH:mm");

            return ({
                type: session.type,
                date,
                time,
                duration,
                client_id: session.client?.id,
                notes: session.notes || '',
                session_id: session.id,
                sessions: [],
            }) as AddSessionFormType
        } else {
            return initialValuesEmpty
        }
    }, [session])

    const handleSubmit = (values: AddSessionFormType, helper: FormikHelpers<AddSessionFormType>) => {
        const {duration, time, client_id, ...rest} = values

        if (session) {
            dispatch({
                type: ACTION_EDIT_SESSIONS_REQUEST,
                payload: {
                    ...rest,
                    id: session?.id,
                    duration: moment(duration, "HH:mm").format("HH:mm:ss"),
                    time: moment(time, "HH:mm").format("HH:mm:ss"),
                }
            });
        } else {
            dispatch({
                type: ACTION_TRAINER_CREATE_SESSION_REQUEST,
                payload: {
                    ...rest,
                    duration: moment(duration, "h:mm").format("HH:mm:ss"),
                    time: moment(time, "h:mm").format("HH:mm:ss"),
                    client_id: +client_id
                }
            });
        }

        helper.setSubmitting(false);
        helper.resetForm();
        onClose();
    };

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
                type: Yup.string().required(),
                date: Yup.date().required().min(moment().startOf('day')),
                duration: Yup.string().required(),
                time: Yup.string().required(),
            })}
        >
            <Form>{children}</Form>
        </Formik>
    )
};

export default AddSessionForm;
