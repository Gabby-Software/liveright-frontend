import React, {useMemo} from 'react';
import Styles from './mobile-layout.styles';
import Header from "../header/header.component";
import MobileFooter from "../mobile-footer/mobile-footer.component";
import {usePage} from "../../hooks/page.hook";
import {footerTypes} from "../../enums/footer-types";
import logger from "../../managers/logger.manager";
import MobileBack from "../../components/mobile-back/mobile-back.component";

const MobileLayout = ({children}: {children: React.ReactNode}) => {
    const page = usePage();
    logger.info('PAGE INFO',page);
    const footerType = useMemo(() =>  page?.footer === undefined ?  footerTypes.DEFAULT : page?.footer, [page]);
    return (
        <Styles>
            <Header/>
            <main className={'mobile-layout__main'}>
                <MobileBack/>
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
