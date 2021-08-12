import React, {useState, useEffect} from 'react';
import Styles, {SettingsLink} from './notifications.styles';
import {notificationsData} from "./notifications.data";
import {NotificationType} from "../../types/notification.type";
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

type Props = {};
const Notifications = ({}: Props) => {
    const {t} = useTranslation();
    const [page, setPage] = useState(1);
    const {notifications: {data, meta}} = useNotifications();
    const dispatch = useDispatch();
    useTitleContent((
        <SettingsLink to={Routes.NOTIFICATIONS_SETTINGS}>
            <FormButton type={'ghost'}>Manage Settings</FormButton>
        </SettingsLink>
    ));
    useEffect(() => {
        api.get(EP_GET_NOTIFICATIONS)
            .then(res => res.data)
            .then(res => logger.success('NOTIFICATIONS', res))
    }, []);
    let seen = false;
    let lastDate = moment();
    return (
        <Styles>
            <FormButton type={'ghost'} className={'mobile'} style={{marginBottom:'40px'}}>Manage Settings</FormButton>
            {notificationsData.slice((page - 1) * 10, page * 10).map((n: NotificationType, i) => {
                const els: React.ReactNode[] = [];
                if (n.seen && !seen && page <= 1) {
                    els.push(<div className={'notification__hr'}><span>{t('notifications:all-done')}</span></div>)
                    els.push(<div
                        className={'notification__date-label desktop'}>{moment(n.datetime).format('DD/MM/YYYY')}</div>)
                } else if (seen && moment(n.datetime).isBefore(lastDate, 'day') || i === 0 && page > 1) {
                    els.push(<div
                        className={'notification__date-label desktop'}>{moment(n.datetime).format('DD/MM/YYYY')}</div>)
                }
                els.push(<Notification {...n}/>);
                seen = n.seen;
                lastDate = moment(n.datetime);
                return els;
            })}
            <DataPagination page={page} setPage={setPage} total={notificationsData.length}/>
        </Styles>
    );
};

export default Notifications;
