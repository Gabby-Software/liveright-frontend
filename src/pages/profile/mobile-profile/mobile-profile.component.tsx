import React, {useState, useEffect} from 'react';
import Styles from './mobile-profile.styles';
import Hr from '../../../components/hr/hr.styles';
import ProfileHeading from "./profile-heading/profile-heading.component";
import ProfileData from "./profile-data/profile-data.component";
import ProfileInfo from "./profile-info/profile-info.component";
import ProfileStaff from "./profile-staff/profile-staff.component";

const MobileProfile = () => {
    return (
        <Styles>
            <ProfileHeading/>
            <ProfileData/>
            <Hr/>
            <ProfileInfo/>
            <Hr/>
            <ProfileStaff/>
        </Styles>
    );
};

export default MobileProfile;
