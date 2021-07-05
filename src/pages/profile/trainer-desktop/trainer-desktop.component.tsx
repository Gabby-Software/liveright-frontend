import React, {useState, useEffect} from 'react';
import Styles from './trainer-desktop.styles';
import ProfileImageSection from "../desktop-profile/sections/profile-image-section/profile-image-section.component";
import {useTrainer} from "../../../hooks/trainer.hook";
import ProfileProvider, {ProfileContext} from "../desktop-profile/profile.context";
import TrainerData from "./sections/trainer-data/trainer-data.component";
import TrainerInfo from "./sections/trainer-info/trainer-info.component";
import ProfileTnbSection from "../desktop-profile/sections/profile-tnb-section/profile-tnb-section.component";

const TrainerDesktop = () => {
    const trainer = useTrainer();
    return (
        <Styles>
            <ProfileProvider>
                <ProfileImageSection {...trainer}/>
                <TrainerData/>
                <TrainerInfo/>
                <ProfileTnbSection tnb={trainer.tnb}/>
            </ProfileProvider>
        </Styles>
    );
};

export default TrainerDesktop;
