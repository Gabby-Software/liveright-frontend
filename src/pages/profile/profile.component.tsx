import React, {useState, useEffect} from 'react';
import Styles from './profile.styles';
import {useIsMobile} from "../../hooks/is-mobile.hook";
import MobileProfile from "./mobile-profile/mobile-profile.component";
import DesktopProfile from "./desktop-profile/desktop-profile.component";
import ProfileProvider from "./desktop-profile/profile.context";

const Profile = () => {
    const isMobile = useIsMobile();
    return (
        <ProfileProvider>
            {isMobile ? <MobileProfile/> : <DesktopProfile/>}
        </ProfileProvider>
    );
};

export default Profile;
