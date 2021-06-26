import React, {useState, useEffect} from 'react';
import Styles from './edit-profile.styles';
import {useIsMobile} from "../../../hooks/is-mobile.hook";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/reducers";
import {Form, Formik, FormikProps} from "formik";
import * as Yup from 'yup';
import {ProfileDataType} from "../../../types/profile-data.type";
import FormInputLabeled from "../../../components/forms/form-input-labeled/form-input-labeled.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import ButtonSubmit from "../../../components/forms/button-submit/button-submit.component";
import FormTextarea from "../../../components/forms/form-textarea/form-textarea.component";
import FormDatepicker from "../../../components/forms/form-datepicker/form-datepicker.component";
import {ACTION_UPDATE_ACCOUNT_REQUEST} from "../../../store/action-types";
import {Routes} from "../../../enums/routes.enum";

const EditProfile = () => {
    const isMobile = useIsMobile();
    const {t} = useTranslation();
    const [submitted, setSubmitted] = useState(false);
    const profileData = useSelector((state: RootState) => state.account);
    const dispatch = useDispatch();
    if (!isMobile) return <Redirect to={'/profile'}/>;
    const handleSubmit = (form: ProfileDataType, submitProps: { setSubmitting: (submitting: boolean) => void }) => {
        console.log(form);
        dispatch({type: ACTION_UPDATE_ACCOUNT_REQUEST, payload: form});
        submitProps.setSubmitting(false);
        setSubmitted(true);
    };
    if(submitted) return <Redirect to={Routes.PROFILE}/>
    return (
        <Styles>
            <Formik initialValues={profileData}
                    onSubmit={handleSubmit}
                    validationSchema={Yup.object({
                        first_name: Yup.string().required().name(),
                        last_name: Yup.string().required().name(),
                        email: Yup.string().required().email(),
                    })}
            >
                {(form: FormikProps<ProfileDataType>) => (
                    <Form>
                        <FormInputLabeled name={'first_name'} label={t('profile:first-name')}/>
                        <FormInputLabeled name={'last_name'} label={t('profile:last-name')}/>
                        <FormDatepicker name={'birth_date'} label={t('profile:birth-date')}/>
                        <FormInputLabeled name={'email'} label={t('profile:email')}/>
                        <FormInputLabeled name={'phone'} label={t('profile:phone')}/>
                        <FormInputLabeled name={'address'} label={t('profile:address')}/>
                        <FormTextarea name={'dietary_restrictions'} label={t('profile:dietary-restrictions')}/>
                        <FormTextarea name={'injuries'} label={t('profile:injuries')}/>
                        <ButtonSubmit id={'form-submit'}>{t('profile:save-changes')}</ButtonSubmit>
                    </Form>
                )}
            </Formik>
        </Styles>
    );
};

export default EditProfile;