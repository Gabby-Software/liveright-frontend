import React, {useState, useEffect} from 'react';
import Styles from './profile-basic.styles';
import ProfileTitle from "../../components/profile-title/profile-title.component";
import {profileBasic} from "../../trainer.data";
import ProfileField from "../../components/profile-field/profile-field.component";

const ProfileBasic = () => {
    return (
        <Styles>
            <ProfileTitle title={'Basic Trainer Profile'}/>
            {
                profileBasic.map(p => <ProfileField {...p}/>)
            }
        </Styles>
    );
};

export default ProfileBasic;
