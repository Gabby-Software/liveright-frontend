import React, {useState, useEffect} from 'react';
import Styles from './edit-profile.styles';
import {useIsMobile} from "../../../hooks/is-mobile.hook";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/reducers";
import {Form, Formik, FormikHelpers, FormikProps} from "formik";
import * as Yup from 'yup';
import {ProfileDataType} from "../../../types/profile-data.type";
import FormInputLabeled from "../../../components/forms/form-input-labeled/form-input-labeled.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import ButtonSubmit from "../../../components/forms/button-submit/button-submit.component";
import FormTextarea from "../../../components/forms/form-textarea/form-textarea.component";
import FormDatepicker from "../../../components/forms/form-datepicker/form-datepicker.component";
import {
    ACTION_UPDATE_ACCOUNT_REQUEST,
    ACTION_UPDATE_AUTH_REQUEST,
    ACTION_UPDATE_PROFILE_REQUEST
} from "../../../store/action-types";
import {Routes} from "../../../enums/routes.enum";
import FormImageUpload from "../../../components/forms/form-image-upload/form-image-upload.component";
import {noImage} from "../../../pipes/no-image.pipe";
import ProfileImage from "../../../components/profile-image/profile-image.component";
import Hr from '../../../components/hr/hr.styles';
import {useAuth} from "../../../hooks/auth.hook";
import {useProfile} from "../../../hooks/profile.hook";
import {AccountObjType, AccountType} from "../../../types/account.type";
import userTypes from "../../../enums/user-types.enum";
import logger from "../../../managers/logger.manager";
import FormFileUpload from "../../../components/forms/form-file-upload/form-file-upload.component";
import FormCountrySelect from "../../../components/forms/form-country-select/form-country-select.component";
import {handleError} from "../../../managers/api.manager";
import {genderTypes} from "../../../enums/gender-types";
import FormRadio from "../../../components/forms/form-radio-button/form-radio-button.component";

const EditProfile = () => {
    const isMobile = useIsMobile();
    const {t} = useTranslation();
    const [submitted, setSubmitted] = useState(false);
    const [file,setFile] = useState<File|null>(null);
    const [tnb, setTnb] = useState<File|null>(null);
    const profileData = useProfile();
    const authData = useAuth();
    const dispatch = useDispatch();
    if (!isMobile) return <Redirect to={'/profile'}/>;
    const handleSubmit = (form: ProfileDataType&AccountObjType&AccountType, helper: FormikHelpers<ProfileDataType&AccountObjType&AccountType>) => {
        logger.log('SUBMIT EDIT', form);
        dispatch({type: ACTION_UPDATE_PROFILE_REQUEST, payload: {
                ...form,
                tnb,
                avatar: file,
                onSuccess: () => {
                    helper.setSubmitting(false);
                    setSubmitted(true);
                },
                onError: handleError(helper)
            }});
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
                        phone_number: Yup.string().phone(),
                        payment_info: Yup.object({
                            account_number: Yup.string()
                                .number().min(6).max(12),
                            tax_id: Yup.string()
                                .number().min(4).max(17),
                            name_on_account: Yup.string().name(true)
                        })
                    })}
            >
                {() => (
                    <Form>
                        <FormImageUpload name={'image'} label={'Change Profile Photo'}
                                         aspectRatio={1}
                                         onUpdate={({file}) => setFile(file)}>
                            {({url}) => (<ProfileImage url={url} placeholder={noImage(authData.first_name, authData.last_name)}/>)}
                        </FormImageUpload>
                        <FormInputLabeled name={'first_name'} label={t('profile:first-name')}/>
                        <FormInputLabeled name={'last_name'} label={t('profile:last-name')}/>
                        <FormDatepicker name={'birthday'} label={t('profile:birth-date')}/>
                        <FormRadio name={'gender'} label={t('profile:gender')} options={[
                            {value: genderTypes.MALE, label: 'Male'},
                            {value: genderTypes.FEMALE, label: 'Female'},
                            {value: genderTypes.OTHER, label: 'Other'},
                        ]}/>
                        <FormInputLabeled name={'email'} label={t('profile:email')} disabled/>
                        <FormInputLabeled name={'phone_number'} label={t('profile:phone')}/>
                        <FormInputLabeled name={'city'} label={t('profile:city')}/>
                        <FormCountrySelect/>
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
                                    <Hr/>
                                </>
                            )
                        }
                        {
                            authData.type === userTypes.CLIENT? null : (
                                <>
                                    <FormInputLabeled name={'payment_info.bank'} label={t('profile:payment-info.bank')}/>
                                    <FormInputLabeled name={'payment_info.branch_name'} label={t('profile:payment-info.branch-name')}/>
                                    <FormInputLabeled name={'payment_info.name_on_account'} label={t('profile:payment-info.name-on-account')}/>
                                    <FormInputLabeled name={'payment_info.account_number'} label={t('profile:payment-info.account-number')}/>
                                    <FormInputLabeled name={'payment_info.tax_id'} label={t('profile:payment-info.tax-id')}/>
                                    <Hr/>
                                    <FormFileUpload name={'tnb.url'} onUpdate={setTnb} label={t('profile:tnb')}
                                                    initialFilename={profileData.terms_and_conditions?.file_name || undefined}/>
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
