import React, {useMemo} from 'react';
import Styles from './mobile-layout.styles';
import Header from "../header/header.component";
import MobileFooter from "../mobile-footer/mobile-footer.component";
import {usePage} from "../../hooks/page.hook";
import {footerTypes} from "../../enums/footer-types";
import logger from "../../managers/logger.manager";

const MobileLayout = ({children}: {children: React.ReactNode}) => {
    const page = usePage();
    const footerType = useMemo(() =>  page?.footer === undefined ?  footerTypes.DEFAULT : page?.footer, [page]);
    return (
        <Styles>
            <Header/>
            <div>{children}</div>
            {
                footerType === footerTypes.DEFAULT ? (
                    <MobileFooter/>
                ) :null
            }
        </Styles>
    );
};

export default MobileLayout;
