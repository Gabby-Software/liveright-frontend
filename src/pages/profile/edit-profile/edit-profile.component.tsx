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
import FormImageUpload from "../../../components/forms/form-image-upload/form-image-upload.component";
import {noImage} from "../../../pipes/no-image.pipe";
import ProfileImage from "../../../components/profile-image/profile-image.component";
import Hr from '../../../components/hr/hr.styles';
import {useAuth} from "../../../hooks/auth.hook";
import {useProfile} from "../../../hooks/profile.hook";
import {AccountObjType} from "../../../types/account.type";
import userTypes from "../../../enums/user-types.enum";

const EditProfile = () => {
    const isMobile = useIsMobile();
    const {t} = useTranslation();
    const [submitted, setSubmitted] = useState(false);
    const [file,setFile] = useState<File|null>(null);
    const profileData = useProfile();
    const authData = useAuth();
    const {first_name, last_name} = useAuth();
    const dispatch = useDispatch();
    if (!isMobile) return <Redirect to={'/profile'}/>;
    const handleSubmit = (form: ProfileDataType, submitProps: { setSubmitting: (submitting: boolean) => void }) => {
        console.log(form);
        dispatch({type: ACTION_UPDATE_ACCOUNT_REQUEST, payload: form});
        submitProps.setSubmitting(false);
        setSubmitted(true);
    };
    if(submitted) return <Redirect to={Routes.PROFILE}/>;
    return (
        <Styles>
            <Formik initialValues={{...profileData,...authData}}
                    onSubmit={handleSubmit}
                    validationSchema={Yup.object({
                        first_name: Yup.string().required().name(),
                        last_name: Yup.string().required().name(),
                        email: Yup.string().required().email(),
                        phone_number: Yup.string().phone()
                    })}
            >
                {() => (
                    <Form>
                        <FormImageUpload name={'image'} label={'Change Profile Photo'}
                                         aspectRatio={1}
                                         onUpdate={({file}) => setFile(file)}>
                            {({url}) => (<ProfileImage url={url} placeholder={noImage(first_name, last_name)}/>)}
                        </FormImageUpload>
                        <FormInputLabeled name={'first_name'} label={t('profile:first-name')}/>
                        <FormInputLabeled name={'last_name'} label={t('profile:last-name')}/>
                        <FormDatepicker name={'birthday'} label={t('profile:birth-date')}/>
                        <FormInputLabeled name={'email'} label={t('profile:email')}/>
                        <FormInputLabeled name={'phone_number'} label={t('profile:phone')}/>
                        <FormInputLabeled name={'address'} label={t('profile:address')}/>
                        <Hr/>
                        {
                            authData.type === userTypes.CLIENT? (
                                <>
                                <FormTextarea name={'dietary_restrictions'} label={t('profile:dietary-restrictions')}/>
                                <FormTextarea name={'injuries'} label={t('profile:injuries')}/>
                                </>
                            ) : (
                                <>
                                    <FormTextarea name={'about'} label={t('profile:about')}/>
                                    <FormTextarea name={'qualifications'} label={t('profile:qualifications')}/>
                                    <FormTextarea name={'additional_information'} label={t('profile:additional-information')}/>
                                </>
                            )
                        }
                        <Hr className={'edit-profile__hr'}/>
                        <ButtonSubmit id={'form-submit'}>{t('profile:save-changes')}</ButtonSubmit>
                    </Form>
                )}
            </Formik>
        </Styles>
    );
};

export default EditProfile;
