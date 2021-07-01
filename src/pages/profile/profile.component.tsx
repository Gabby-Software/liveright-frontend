import React, {useState, useEffect} from 'react';
import Styles from './profile.styles';
import {useIsMobile} from "../../hooks/is-mobile.hook";
import MobileProfile from "./mobile-profile/mobile-profile.component";
import DesktopProfile from "./desktop-profile/desktop-profile.component";
import ProfileProvider from "./desktop-profile/profile.context";
import {useDispatch} from "react-redux";
import {ACTION_GET_ACCOUNT_REQUEST} from "../../store/action-types";

const Profile = () => {
    const isMobile = useIsMobile();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: ACTION_GET_ACCOUNT_REQUEST});
    }, []);
    return (
        <ProfileProvider>
            {isMobile ? <MobileProfile/> : <DesktopProfile/>}
        </ProfileProvider>
    );
};

export default Profile;
