import React, {useState, useEffect} from 'react';
import Styles from './desktop-profile.styles';
import {Form, Formik, FormikProps} from "formik";
import {ProfileDataType} from "../../../types/profile-data.type";
import profilePlaceholder from '../../../assets/media/profile-placeholder.png';
import * as Yup from 'yup';
import ProfileImageSection from "./sections/profile-image-section/profile-image-section.component";
import ProfileDataSection from "./sections/profile-data-section/profile-data-section.component";
import ProfileInfoSection from "./sections/profile-info-section/profile-info-section.component";
import ProfileAccountsSection from "./sections/profile-accounts-section/profile-accounts-section.component";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/reducers";

const DesktopProfile = () => {
    const profileData = useSelector((state: RootState) => state.account);
    const handleSubmit = (form: ProfileDataType, submitProps: { setSubmitting: (submitting: boolean) => void }) => {
        console.log(form);
        alert(`submitted!\n${JSON.stringify(form)}`);
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
                        (form: FormikProps<ProfileDataType>) => (
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
