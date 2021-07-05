import React, {useState, useEffect} from 'react';
import Styles from './trainer.styles';
import {useIsMobile} from "../../../hooks/is-mobile.hook";
import TrainerMobile from "../trainer-mobile/trainer-mobile.component";
import TrainerDesktop from "../trainer-desktop/trainer-desktop.component";

const Trainer = () => {
    const isMobile = useIsMobile();
    if(isMobile) return <TrainerMobile/>;
    return <TrainerDesktop/>;
};

export default Trainer;
