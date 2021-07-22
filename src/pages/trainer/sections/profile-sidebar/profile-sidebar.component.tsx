import React, {useState, useEffect} from 'react';
import Styles, {PTitle, PSubtitle, PSpace, PExtLink, PHr} from './profile-sidebar.styles';
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {Logo} from "../../../auth/styles";

const ProfileSidebar = () => {
    const {t} = useTranslation();
    return (
        <Styles>
            <Logo className={'sidebar__logo'}/>
            <div className={'sidebar__body'}>
                <PTitle>My Trainer</PTitle>
                <PSpace/>
                <PSubtitle>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam asperiores beatae dolores!</PSubtitle>
            </div>
        </Styles>
    );
};

export default ProfileSidebar;
