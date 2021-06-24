import React, {useState, useEffect} from 'react';
import Styles from './mobile-layout.styles';
import {Layout} from "antd";
import Header from "../header/header.component";
import MobileFooter from "../mobile-footer/mobile-footer.component";

type Props = {
    children: React.ReactNode;
}
const MobileLayout = ({children}: Props) => {
    return (
        <div>
            <Header/>
            <div>{children}</div>
            <MobileFooter/>
        </div>
    );
};

export default MobileLayout;
