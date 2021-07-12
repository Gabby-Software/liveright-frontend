import React, {useState, useEffect, useContext} from 'react';
import Styles from './desktop-profile.styles';
import {Form, Formik, FormikHelpers, FormikProps} from "formik";
import {ProfileDataType} from "../../../types/profile-data.type";
import * as Yup from 'yup';
import ProfileImageSection from "./sections/profile-image-section/profile-image-section.component";
import ProfileDataSection from "./sections/profile-data-section/profile-data-section.component";
import ProfileInfoSection from "./sections/profile-info-section/profile-info-section.component";
import ProfileAccountsSection from "./sections/profile-accounts-section/profile-accounts-section.component";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/reducers";
import ProfileProvider, {ProfileContext} from "./profile.context";
import {
    ACTION_UPDATE_ACCOUNT_REQUEST,
    ACTION_UPDATE_AUTH_REQUEST,
    ACTION_UPDATE_PROFILE_REQUEST
} from "../../../store/action-types";
import {useProfile} from "../../../hooks/profile.hook";
import {useAuth} from "../../../hooks/auth.hook";
import userTypes from "../../../enums/user-types.enum";
import ProfileStaffSection from "./sections/profile-staff-section/profile-staff-section.component";
import ProfilePaymentInfoSection from "./sections/profile-payment-info-section/profile-payment-info-section.component";
import ProfileTnb from "../mobile-profile/profile-tnb/profile-tnb.component";
import ProfileTnbSection from "./sections/profile-tnb-section/profile-tnb-section.component";
import {handleError} from "../../../managers/api.manager";
import {AccountObjType, AccountType} from "../../../types/account.type";

const DesktopProfile = () => {
    const profileData = useProfile();
    const authData = useAuth();
    const dispatch = useDispatch();
    const {setEditMode, tnbFile, imageFile} = useContext(ProfileContext);
    const handleSubmit = (form: ProfileDataType&AccountObjType&AccountType, helper: FormikHelpers<ProfileDataType&AccountObjType&AccountType>) => {
        console.log('submitted profile', form);
        dispatch({
            type: ACTION_UPDATE_PROFILE_REQUEST, payload: {
                ...form,
                tnb: tnbFile,
                avatar: imageFile,
                onSuccess: () => {
                    helper.setSubmitting(false);
                    setEditMode(false);
                },
                onError: handleError(helper)
            }
        });
    };
    return (
        <Styles>
            <div className={'profile__wrapper'}>
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={{...profileData, ...authData}}
                    validationSchema={Yup.object({
                        image: Yup.string(),
                        first_name: Yup.string().required().name(),
                        last_name: Yup.string().required().name(),
                        email: Yup.string().required().email(),
                        phone_number: Yup.string().phone(),
                        payment_info: Yup.object({
                            account_number: Yup.string()
                                .number().min(6).max(12),
                            tax_id: Yup.string().number()
                                .min(4).max(17),
                            name_on_account: Yup.string().name(true)
                        })
                    })}
                >
                    {
                        () => (
                            <Form>
                                <ProfileImageSection {...authData}/>
                                <ProfileDataSection/>
                                <ProfileInfoSection {...profileData} {...authData}/>
                                {
                                    authData.type === userTypes.CLIENT ? null : (
                                        <>
                                            <ProfilePaymentInfoSection/>
                                            <ProfileTnbSection tnb={profileData.tnb}/>
                                        </>
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
