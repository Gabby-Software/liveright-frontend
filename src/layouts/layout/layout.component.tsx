import React, {useState, useEffect} from 'react';
import Styles from './layout.styles';
import DesktopLayout from "../desktop-layout/desktop-layout.component";
import MobileLayout from "../mobile-layout/mobile-layout.component";
import {useWindowSize} from "../../hooks/window-size.hook";
import {screenSizes} from "../../enums/screen-sizes.enum";
import {onlyAuth} from "../../guards/auth.guard";
import {onlyActive} from "../../guards/active.guard";
import {useIsMobile} from "../../hooks/is-mobile.hook";

type Props = {
    children: React.ReactNode;
}
const Layout = ({children}: Props) => {
    const isMobile = useIsMobile();
    return isMobile ? (
            <MobileLayout>{children}</MobileLayout>
        ) : (
            <DesktopLayout>{children}</DesktopLayout>
        );
};

export default onlyAuth(onlyActive(Layout));
