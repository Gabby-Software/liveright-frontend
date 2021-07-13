import React, {useState, useEffect} from 'react';
import {useIsMobile} from "../../hooks/is-mobile.hook";
import PlansDesktop from "./plans-desktop/plans-desktop.component";
import PlansMobile from "./plans-mobile/plans-mobile.component";

const Plans = () => {
    const isMobile = useIsMobile();
    return isMobile ? <PlansMobile/> : <PlansDesktop/>;
};

export default Plans;
