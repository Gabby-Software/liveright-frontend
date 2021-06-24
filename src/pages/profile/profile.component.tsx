import React, {useState, useEffect} from 'react';
import Styles from './profile.styles';
import {useIsMobile} from "../../hooks/is-mobile.hook";
import MobileProfile from "./mobile-profile/mobile-profile.component";
import DesktopProfile from "./desktop-profile/desktop-profile.component";

const Profile = () => {
    const isMobile = useIsMobile();
    if(isMobile) return <MobileProfile/>;
    return <DesktopProfile/>;
};

export default Profile;
