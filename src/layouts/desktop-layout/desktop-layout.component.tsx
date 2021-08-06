import React, {useState, useEffect, useRef} from 'react';
import Styles from './desktop-layout.styles';
import DesktopSidebar from "../desktop-sidebar/desktop-sidebar.component";
import PageTitle from "../../components/titles/page-title.styles";
import {useHeader} from "../../hooks/header.hook";
import MobileBack from "../../components/mobile-back/mobile-back.component";

const desktopTitleRef: {setTitleContent: (el: React.ReactNode) => void} = {setTitleContent: () => {}};
export const useTitleContent = (el: React.ReactNode) => {
    useEffect(() => {
        desktopTitleRef.setTitleContent(el);
        return () => desktopTitleRef.setTitleContent(null);
    }, [el]);
};
const DesktopLayout = ({children}: {children:React.ReactNode}) => {
    const {title} = useHeader();
    const [titleContent, setTitleContent] = useState<React.ReactNode>(null);
    desktopTitleRef.setTitleContent = setTitleContent;
    return (
        <Styles>
            <DesktopSidebar/>
            <div className={'layout__wrapper'}>
                {/*<DesktopHeader/>*/}
                <MobileBack/>
                <PageTitle>
                    {title}
                    {titleContent}
                </PageTitle>
                <main>{children}</main>
            </div>
        </Styles>
    );
};

export default DesktopLayout;
