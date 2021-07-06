import React, {useState, useEffect} from 'react';
import Styles from './trainer-mobile.styles';
import {useTrainer} from "../../../../hooks/trainer.hook";
import ProfileHeading from "../../mobile-profile/profile-heading/profile-heading.component";
import ProfileData from "../../mobile-profile/profile-data/profile-data.component";
import Hr from "../../../../components/hr/hr.styles";
import ProfileTnb from "../../mobile-profile/profile-tnb/profile-tnb.component";
import TrainerInfoMobile from "./sections/trainer-info-mobile/trainer-info-mobile.component";
import ProfileStaff from "../../mobile-profile/profile-staff/profile-staff.component";

const TrainerMobile = () => {
    const trainer = useTrainer();
    return (
        <Styles>
            <ProfileHeading {...trainer}/>
            <ProfileData {...trainer}/>
            <Hr/>
            <TrainerInfoMobile/>
            <Hr/>
            <ProfileTnb tnb={trainer.tnb}/>
            <Hr/>
            <ProfileStaff/>
        </Styles>
    )
};

export default TrainerMobile;