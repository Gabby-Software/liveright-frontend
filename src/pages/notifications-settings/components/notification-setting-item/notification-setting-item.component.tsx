import React, {useState, useEffect} from 'react';
import Styles from './notification-setting-item.styles';
import {NotificationsSettingsType} from "../../notifications-settings.type";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {FormToggleUI} from "../../../../components/forms/form-toggle/form-toggle.component";
import logger from "../../../../managers/logger.manager";

const NotificationSettingItem = ({title, email, browser, onUpdate}:NotificationsSettingsType&{onUpdate:(t:NotificationsSettingsType)=>void}) => {
    const {t} = useTranslation();
    logger.info('itemData', title, email, browser);
    return (
        <Styles className={'notset-item'}>
            <h3 className={'notset-item__title'}>{t(title)}</h3>
            <div className={'notset-item__actions'}>
                <div className={'notset-item__action'}>
                    <FormToggleUI label={t('settings:notifications.email')} value={email} onUpdate={(val) => onUpdate({title, email:val,browser})}/>
                </div>
                <div className={'notset-item__action'}>
                    <FormToggleUI label={t('settings:notifications.browser')} value={browser} onUpdate={(val) => onUpdate({title, email,browser:val})}/>
                </div>
            </div>
        </Styles>
    );
};

export default NotificationSettingItem;
