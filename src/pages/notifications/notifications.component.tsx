import React, {useState, useEffect} from 'react';
import Styles, {SettingsLink} from './notifications.styles';
import {notificationsData} from "./notifications.data";
import moment from 'moment';
import {useTranslation} from "../../modules/i18n/i18n.hook";
import Notification from "./components/notification/notification.component";
import DataPagination from "../../components/data-pagination/data-pagination.component";
import api from "../../managers/api.manager";
import {EP_GET_NOTIFICATIONS} from "../../enums/api.enum";
import logger from "../../managers/logger.manager";
import {useTitleContent} from "../../layouts/desktop-layout/desktop-layout.component";
import FormButton from "../../components/forms/form-button/form-button.component";
import {Routes} from "../../enums/routes.enum";
import {useNotifications} from "../../modules/notifications/notifications.hook";
import {useDispatch} from "react-redux";
import {NotificationType} from "../../types/notifications.type";
import {ACTION_GET_NOTIFICATIONS_REQUEST} from "../../store/action-types";
import notificationManager from "../../modules/notifications/notifications.manager";

type Props = {};
const Notifications = ({}: Props) => {
    const {t} = useTranslation();
    const {notifications: {data, meta}} = useNotifications();
    const dispatch = useDispatch();
    useTitleContent((
        <SettingsLink to={Routes.NOTIFICATIONS_SETTINGS}>
            <FormButton type={'ghost'}>Manage Settings</FormButton>
        </SettingsLink>
    ));
    useEffect(() => {
        fetchNotifications(meta.current_page);
        notificationManager.subscribe(fetchNotifications)
    }, []);
    const fetchNotifications = (page = meta.current_page) => {
        dispatch({type: ACTION_GET_NOTIFICATIONS_REQUEST, payload: {page}});
    }
    let seen = false;
    let lastDate = moment();
    return (
        <Styles>
            <FormButton type={'ghost'} className={'mobile'} style={{marginBottom:'40px'}}>Manage Settings</FormButton>
            {data.map((n: NotificationType, i) => {
                const els: React.ReactNode[] = [];
                if (n.read_at && !seen && meta.current_page <= 1) {
                    els.push(<div className={'notification__hr'}><span>{t('notifications:all-done')}</span></div>)
                    els.push(<div
                        className={'notification__date-label desktop'}>{moment(n.created_at).format('DD/MM/YYYY')}</div>)
                } else if (seen && moment(n.created_at).isBefore(lastDate, 'day') || i === 0 && meta.current_page > 1) {
                    els.push(<div
                        className={'notification__date-label desktop'}>{moment(n.created_at).format('DD/MM/YYYY')}</div>)
                }
                els.push(<Notification {...n}/>);
                seen = !!n.read_at;
                lastDate = moment(n.created_at);
                return els;
            })}
            <DataPagination page={meta.current_page} setPage={fetchNotifications} total={meta.total}/>
        </Styles>
    );
};

export default Notifications;
