import React, {useState, useEffect} from 'react';
import Styles from './profile-info.styles';
import Accordion from "../../../../components/accordion/accordion.component";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/reducers";

const ProfileInfo = () => {
    const {dietary_restrictions, injuries} = useSelector((state: RootState) => state.account);
    const {t} = useTranslation();
    return (
        <Styles>
            <Accordion>
                <Accordion.Item title={t('profile:dietary-restrictions')}>
                    {dietary_restrictions}
                </Accordion.Item>
                <Accordion.Item title={t('profile:injuries')}>
                    {injuries}
                </Accordion.Item>
            </Accordion>
        </Styles>
    )
};

export default ProfileInfo;
