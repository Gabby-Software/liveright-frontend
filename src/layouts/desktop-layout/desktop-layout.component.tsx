import React, {useState, useEffect, useRef} from 'react';
import Styles from './desktop-layout.styles';
import DesktopSidebar from "../desktop-sidebar/desktop-sidebar.component";
import DesktopHeader from "../desktop-header/desktop-header.component";
import PageTitle from "../../components/titles/page-title.styles";
import {useHeader} from "../../hooks/header.hook";

export const desktopTitleRef: {ref: React.RefObject<any>} = {ref: React.createRef()};
const DesktopLayout = ({children}: {children:React.ReactNode}) => {
    const {title} = useHeader();
    const titleRef = useRef(null);
    desktopTitleRef.ref = titleRef;
    return (
        <Styles>
            <DesktopSidebar/>
            <div className={'layout__wrapper'}>
                {/*<DesktopHeader/>*/}
                <PageTitle>
                    {title}
                    <div className={'layout__title-content'} ref={titleRef}/>
                </PageTitle>
                <main>{children}</main>
            </div>
        </Styles>
    );
};

export default DesktopLayout;
