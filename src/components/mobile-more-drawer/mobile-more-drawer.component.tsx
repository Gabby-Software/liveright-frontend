import React, {useState, useEffect} from 'react';
import Styles from './mobile-more-drawer.styles';
import BottomDrawer from "../bottom-drawer/bottom-drawer.component";
import {useTranslation} from "../../modules/i18n/i18n.hook";

type MobileMoreDrawerPropsType = {
    isOpen: boolean;
    onClose: ()=>void;
};
const MobileMoreDrawer = ({isOpen, onClose}:MobileMoreDrawerPropsType) => {
    const {t} = useTranslation();
    return (
        <BottomDrawer
            isOpen={isOpen}
            onClose={onClose}
            title={t("more")}>

        </BottomDrawer>
    );
};

export default MobileMoreDrawer;
