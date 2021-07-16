import React, {useState, useEffect, useMemo} from 'react';
import Styles from './profile-info.styles';
import Accordion from "../../../../components/accordion/accordion.component";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {useProfile} from "../../../../hooks/profile.hook";
import {useAuth} from "../../../../hooks/auth.hook";
import userTypes from "../../../../enums/user-types.enum";
import {OptionType} from "../../../../types/option.type";
import logger from "../../../../managers/logger.manager";

const ProfileInfo = () => {
    const {dietary_restrictions, injuries, about, qualifications, additional_information} = useProfile();
    logger.info('INFO DATA', injuries, dietary_restrictions);
    const auth = useAuth();
    const {t} = useTranslation();
    const items: OptionType[] = useMemo(() => auth.type === userTypes.CLIENT ? [
        {label: t('profile:dietary-restrictions'), value: dietary_restrictions},
        {label: t('profile:injuries'), value: injuries},
    ] : [
        {label: t('profile:about'), value: about},
        {label: t('profile:qualifications'), value: qualifications},
        {label: t('profile:additional-information'), value: additional_information},
    ], [auth.type]);
    logger.info('USER TYPE', auth.type, auth);
    return (
        <Styles>
            <Accordion>
                {
                    items.map(({label, value}) => (
                        <Accordion.Item title={label}>
                            {value || t('no-data')}
                        </Accordion.Item>
                    ))
                }
            </Accordion>
        </Styles>
    )
};

export default ProfileInfo;
