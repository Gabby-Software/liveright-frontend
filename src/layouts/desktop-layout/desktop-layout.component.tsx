import React, {useState, useEffect} from 'react';
import Styles from './desktop-layout.styles';
import DesktopSidebar from "../desktop-sidebar/desktop-sidebar.component";
import DesktopHeader from "../desktop-header/desktop-header.component";

const DesktopLayout = ({children}: {children:React.ReactNode}) => {
    return (
        <Styles>
            <DesktopSidebar/>
            <div className={'layout__wrapper'}>
                <DesktopHeader/>
                <main>{children}</main>
            </div>
        </Styles>
    );
};

export default DesktopLayout;
