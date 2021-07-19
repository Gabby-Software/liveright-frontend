import React, {useState, useEffect} from 'react';
import Styles from './notifications-settings.styles';
import PageTitle from "../../components/titles/page-title.styles";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import PageSubtitle from "../../components/titles/page-subtitle.styles";
import PageDesc from "../../components/titles/page-desc.styles";
import {notificationsSettingsData} from "./notifications-settings.data";
import NotificationSettingItem from "./components/notification-setting-item/notification-setting-item.component";
import {NotificationsSettingsType} from "./notifications-settings.type";
import logger from "../../managers/logger.manager";

const NotificationsSettings = () => {
    const {t} = useTranslation();
    const [data, setData] = useState<NotificationsSettingsType[]>(notificationsSettingsData);
    const update = (i: number, t: NotificationsSettingsType) => {
        logger.info('updating', i, t);
        data[i] = t;
        setData([...data]);
    };
    logger.info('data', data);
    return (
        <Styles>
            <PageSubtitle>{t('settings:notifications.title')}</PageSubtitle>
            <PageDesc>{t('settings:notifications.desc')}</PageDesc>
            <div className={'notif-settings__cont'}>
                {
                    data.map((n, i) => <NotificationSettingItem {...n} key={i}
                                                                                     onUpdate={(t) => update(i, t)}/>)
                }
            </div>
            <p className={'notif-settings__note'}>{t('settings:notifications.note')}</p>
        </Styles>
    );
};

export default NotificationsSettings;
