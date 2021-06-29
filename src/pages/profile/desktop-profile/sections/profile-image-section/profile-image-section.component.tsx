import React, {useState, useEffect} from 'react';
import Styles from './profile-image-section.styles';
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/reducers";
import ProfileImage from "../../../../../components/profile-image/profile-image.component";
import {noImage} from "../../../../../pipes/no-image.pipe";

const ProfileImageSection = () => {
    const profileImage = useSelector((state: RootState) => state.account.image);
    return (
        <Styles>
            <ProfileImage url={profileImage} placeholder={noImage('Yosef', "Tuk")}/>
        </Styles>
    )
};

export default ProfileImageSection;
