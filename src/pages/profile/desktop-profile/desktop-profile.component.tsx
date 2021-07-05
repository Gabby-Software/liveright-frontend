import React, {useState, useEffect, useContext} from 'react';
import Styles from './desktop-profile.styles';
import {Form, Formik, FormikProps} from "formik";
import {ProfileDataType} from "../../../types/profile-data.type";
import * as Yup from 'yup';
import ProfileImageSection from "./sections/profile-image-section/profile-image-section.component";
import ProfileDataSection from "./sections/profile-data-section/profile-data-section.component";
import ProfileInfoSection from "./sections/profile-info-section/profile-info-section.component";
import ProfileAccountsSection from "./sections/profile-accounts-section/profile-accounts-section.component";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/reducers";
import ProfileProvider, {ProfileContext} from "./profile.context";
import {ACTION_UPDATE_ACCOUNT_REQUEST, ACTION_UPDATE_AUTH_REQUEST} from "../../../store/action-types";
import {useProfile} from "../../../hooks/profile.hook";
import {useAuth} from "../../../hooks/auth.hook";
import userTypes from "../../../enums/user-types.enum";
import ProfileStaffSection from "./sections/profile-staff-section/profile-staff-section.component";
import ProfilePaymentInfoSection from "./sections/profile-payment-info-section/profile-payment-info-section.component";

const DesktopProfile = () => {
    const profileData = useProfile();
    const authData = useAuth();
    const dispatch = useDispatch();
    const {setEditMode} = useContext(ProfileContext);
    const handleSubmit = (form: ProfileDataType, submitProps: { setSubmitting: (submitting: boolean) => void }) => {
        console.log('submitted profile' ,form);
        dispatch({type: ACTION_UPDATE_ACCOUNT_REQUEST, payload: form});
        dispatch({type: ACTION_UPDATE_AUTH_REQUEST, payload: form});
        setEditMode(false);
        submitProps.setSubmitting(false);
    };
    return (
            <Styles>
                <div className={'profile__wrapper'}>
                    <Formik
                        onSubmit={handleSubmit}
                        initialValues={{...profileData,...authData}}
                        validationSchema={Yup.object({
                            image: Yup.string(),
                            first_name: Yup.string().required().name(),
                            last_name: Yup.string().required().name(),
                            email: Yup.string().required().email(),
                            phone_number: Yup.string().phone(),
                            payment_info: Yup.object({
                                account_number: Yup.number(),
                                name_on_account: Yup.string().name(true)
                            })
                        })}
                    >
                        {
                            () => (
                                <Form>
                                    <ProfileImageSection/>
                                    <ProfileDataSection/>
                                    <ProfileInfoSection/>
                                    {
                                        authData.type === userTypes.CLIENT ? null : (
                                            <ProfilePaymentInfoSection/>
                                        )
                                    }
                                </Form>
                            )
                        }
                    </Formik>
                    <ProfileAccountsSection/>
                </div>
            </Styles>
    );
};

export default DesktopProfile;
