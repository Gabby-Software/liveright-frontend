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
import ProfilePaymentInfo from "./profile-payment-info/profile-payment-info.component";
import ProfileTnb from "./profile-tnb/profile-tnb.component";

const MobileProfile = () => {
    const {type} = useAuth();
    console.log('TYPE', type, userTypes, type === userTypes.TRAINER);
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
                        <ProfilePaymentInfo/>
                        <Hr/>
                        <ProfileTnb/>
                    </>
                ) : null
            }
        </Styles>
    );
};

export default MobileProfile;
