import React, {useState, useEffect} from 'react';
import Styles from './edit-profile.styles';
import {useIsMobile} from "../../../hooks/is-mobile.hook";
import {Redirect} from "react-router-dom";

const EditProfile = () => {
    const isMobile = useIsMobile();
    if(!isMobile) return <Redirect to={'/profile'}/>;
    return (
        <Styles>

        </Styles>
    );
};

export default EditProfile;
