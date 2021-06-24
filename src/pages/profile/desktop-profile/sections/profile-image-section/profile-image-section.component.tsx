import React, {useState, useEffect} from 'react';
import Styles from './profile-image-section.styles';
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/reducers";

const ProfileImageSection = () => {
    const profileImage = useSelector((state: RootState) => state.account.image);
    return (
        <Styles>
            <img alt={'profile'} className={'profile'} src={profileImage}/>
        </Styles>
    )
};

export default ProfileImageSection;
