import React, {useEffect, useMemo, useState} from 'react';
import Styles from './mobile-layout.styles';
import Header from "../header/header.component";
import MobileFooter from "../mobile-footer/mobile-footer.component";
import {usePage} from "../../hooks/page.hook";
import {footerTypes} from "../../enums/footer-types";
import logger from "../../managers/logger.manager";
import MobileBack from "../../components/mobile-back/mobile-back.component";
import {useHeader} from "../../hooks/header.hook";

const mobileTitleRef: {setTitleContent: (el: React.ReactNode) => void} = {setTitleContent: () => {}};
export const useMobileTitleContent = (el: React.ReactNode) => {
  useEffect(() => {
    mobileTitleRef.setTitleContent(el);
    return () => mobileTitleRef.setTitleContent(null);
  }, []);
};
const MobileLayout = ({children}: {children: React.ReactNode}) => {
    const page = usePage();
    const {title} = useHeader();
    const [titleContent, setTitleContent] = useState<React.ReactNode>(null);
    const footerType = useMemo(() =>  page?.footer === undefined ?  footerTypes.DEFAULT : page?.footer, [page]);
    mobileTitleRef.setTitleContent = setTitleContent;
    return (
        <Styles>
            <Header/>
            <main className={'mobile-layout__main'}>
                <MobileBack/>
                <h1 className={'mobile-layout__title'}>
                  {title}
                  {titleContent}
                </h1>
                {children}
            </main>
            {
                footerType === footerTypes.NONE ? null:(
                    <MobileFooter/>
                )
            }
        </Styles>
    );
};

export default MobileLayout;
