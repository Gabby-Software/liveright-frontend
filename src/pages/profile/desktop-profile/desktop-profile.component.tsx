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
import {ACTION_UPDATE_ACCOUNT_REQUEST} from "../../../store/action-types";

const DesktopProfile = () => {
    const profileData = useSelector((state: RootState) => state.account);
    const dispatch = useDispatch();
    const {setEditMode} = useContext(ProfileContext);
    const handleSubmit = (form: ProfileDataType, submitProps: { setSubmitting: (submitting: boolean) => void }) => {
        console.log('submitted profile' ,form);
        dispatch({type: ACTION_UPDATE_ACCOUNT_REQUEST, payload: form});
        setEditMode(false);
        submitProps.setSubmitting(false);
    };
    return (
            <Styles>
                <div className={'profile__wrapper'}>
                    <Formik
                        onSubmit={handleSubmit}
                        initialValues={profileData}
                        validationSchema={Yup.object({
                            image: Yup.string(),
                            first_name: Yup.string().required().name(),
                            last_name: Yup.string().required().name(),
                            email: Yup.string().required().email(),
                            phone: Yup.string().required(),
                            address: Yup.string().required(),
                        })}
                    >
                        {
                            () => (
                                <Form>
                                    <ProfileImageSection/>
                                    <ProfileDataSection/>
                                    <ProfileInfoSection/>
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
