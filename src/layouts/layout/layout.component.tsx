import React, {useState, useEffect} from 'react';
import Styles from './layout.styles';
import DesktopLayout from "../desktop-layout/desktop-layout.component";
import MobileLayout from "../mobile-layout/mobile-layout.component";
import {useWindowSize} from "../../hooks/window-size.hook";
import {screenSizes} from "../../enums/screen-sizes.enum";

type Props = {
    children: React.ReactNode;
}
const Layout = ({children}: Props) => {
    const {width} = useWindowSize();
    return width <= screenSizes.TABLET ? (
            <MobileLayout>{children}</MobileLayout>
        ) : (
            <DesktopLayout>{children}</DesktopLayout>
        );
};

export default Layout;
