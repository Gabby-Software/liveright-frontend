import React, {useState, useEffect} from 'react';
import Styles from './mobile-layout.styles';
import Header from "../header/header.component";
import MobileFooter from "../mobile-footer/mobile-footer.component";

const MobileLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <Styles>
            <Header/>
            <div>{children}</div>
            <MobileFooter/>
        </Styles>
    );
};

export default MobileLayout;
