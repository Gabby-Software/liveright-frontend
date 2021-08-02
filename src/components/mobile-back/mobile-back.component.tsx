import React, {useState, useEffect} from 'react';
import Styles from './mobile-back.styles';
import {Routes} from "../../enums/routes.enum";
import {ReactComponent as BackIcon} from "../../assets/media/icons/back-arrow.svg";
import {Link} from "react-router-dom";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {usePage} from "../../hooks/page.hook";

const backData: { setTo: (to: string) => void, setAlias: (alias: string) => void } = {
    setTo: () => {
    }, setAlias: () => {
    }
};
export const useMobileBack = (to: string, alias: string) => {
    useEffect(() => {
        backData.setTo(to);
        backData.setAlias(alias);
        return () => {
            backData.setTo(Routes.HOME);
            backData.setAlias('home');
        }
    }, []);
};
const MobileBack = () => {
    const page = usePage();
    const {t} = useTranslation();
    if (!page?.back) return null;
    return (
        <Styles to={page.back.url}>
            <BackIcon className={'mobile-back__icon'}/>
            <span className={'mobile-back__alias'}>{t(`back-to`,{to:t(`menu.${page.back.alias}`)})}</span>
        </Styles>
    )
};

export default MobileBack;
