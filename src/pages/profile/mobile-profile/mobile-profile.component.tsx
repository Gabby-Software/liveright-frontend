import React, {useState, useEffect} from 'react';
import Styles from './mobile-profile.styles';
import Hr from '../../../components/hr/hr.styles';
import ProfileHeading from "./profile-heading/profile-heading.component";
import ProfileData from "./profile-data/profile-data.component";
import ProfileInfo from "./profile-info/profile-info.component";
import ProfileStaff from "./profile-staff/profile-staff.component";
import ButtonSubmit from "../../../components/forms/button-submit/button-submit.component";
import {useAuth} from "../../../hooks/auth.hook";
import userTypes from "../../../enums/user-types.enum";

const MobileProfile = () => {
    const {type} = useAuth();
    return (
        <Styles>
            <ProfileHeading/>
            <ProfileData/>
            <Hr/>
            <ProfileInfo/>
            {
                type === userTypes.TRAINER ? (
                    <>
                        <Hr/>
                        <ProfileStaff/>
                    </>
                ) : null
            }
        </Styles>
    );
};

export default MobileProfile;
