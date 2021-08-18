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
import {useDispatch, useSelector} from "react-redux";
import {
    ACTION_GET_NOTIFICATIONS_SETTINGS_REQUEST,
    ACTION_UPDATE_NOTIFICATIONS_SETTINGS_REQUEST
} from "../../store/action-types";
import {RootState} from "../../store/reducers";
import {
    NotificationSettingsCategoryType,
    NotificationSettingsCategoryValuesType,
    NotificationSettingsType
} from "../../modules/notifications/types/notification-settings.type";
import {throttle} from "../../pipes/throttle.pipe";

const NotificationsSettings = () => {
    const {t} = useTranslation();
    const settings = useSelector((state:RootState) => state.notifications.settings);
    const [data, setData] = useState<NotificationSettingsType>(settings);
    const dispatch = useDispatch();
    const update = (key: NotificationSettingsCategoryType, t: NotificationSettingsCategoryValuesType) => {
        logger.info('updating', key, t);
        data[key] = t;
        setData({...data});
        dispatch({type:ACTION_UPDATE_NOTIFICATIONS_SETTINGS_REQUEST, payload: data})
    };
    logger.info('data', data);
    useEffect(() => {
        dispatch({type:ACTION_GET_NOTIFICATIONS_SETTINGS_REQUEST})
    }, []);
    return (
        <Styles>
            <PageSubtitle>{t('settings:notifications.title')}</PageSubtitle>
            <PageDesc>{t('settings:notifications.desc')}</PageDesc>
            <div className={'notif-settings__cont'}>
                {
                    Object.entries(data).map(([key, value], i) =>
                        <NotificationSettingItem title={key} {...value} key={i}  onUpdate={(t) => update(key as NotificationSettingsCategoryType, t)}/>)
                }
            </div>
            <p className={'notif-settings__note'}>{t('settings:notifications.note')}</p>
        </Styles>
    );
};

export default NotificationsSettings;
