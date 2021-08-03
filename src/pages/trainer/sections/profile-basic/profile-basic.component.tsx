import React, {useState, useEffect} from 'react';
import Styles from './profile-basic.styles';
import ProfileTitle from "../../components/profile-title/profile-title.component";
import {profileBasic} from "../../trainer.data";
import ProfileField from "../../components/profile-field/profile-field.component";

const ProfileBasic = ({title}:{title:string}) => {
    return (
        <Styles>
            <ProfileTitle title={title}/>
            {
                profileBasic.map(p => <ProfileField {...p}/>)
            }
        </Styles>
    );
};

export default ProfileBasic;
