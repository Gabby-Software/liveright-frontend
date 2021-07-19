import React, {useState, useEffect} from 'react';
import Styles from './desktop-layout.styles';
import DesktopSidebar from "../desktop-sidebar/desktop-sidebar.component";
import DesktopHeader from "../desktop-header/desktop-header.component";
import PageTitle from "../../components/titles/page-title.styles";
import {useHeader} from "../../hooks/header.hook";

const DesktopLayout = ({children}: {children:React.ReactNode}) => {
    const {title} = useHeader();
    return (
        <Styles>
            <DesktopSidebar/>
            <div className={'layout__wrapper'}>
                {/*<DesktopHeader/>*/}
                <PageTitle>{title}</PageTitle>
                <main>{children}</main>
            </div>
        </Styles>
    );
};

export default DesktopLayout;
