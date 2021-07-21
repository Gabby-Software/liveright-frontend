import React, {useMemo} from 'react';
import Styles from './mobile-layout.styles';
import Header from "../header/header.component";
import MobileFooter from "../mobile-footer/mobile-footer.component";
import {usePage} from "../../hooks/page.hook";
import {footerTypes} from "../../enums/footer-types";
import logger from "../../managers/logger.manager";

const MobileLayout = ({children}: {children: React.ReactNode}) => {
    const page = usePage();
    logger.info('PAGE INFO',page);
    const footerType = useMemo(() =>  page?.footer === undefined ?  footerTypes.DEFAULT : page?.footer, [page]);
    return (
        <Styles>
            <Header/>
            <main className={'mobile-layout__main'}>{children}</main>
            {
                footerType === footerTypes.DEFAULT ? (
                    <MobileFooter/>
                ) :null
            }
        </Styles>
    );
};

export default MobileLayout;
