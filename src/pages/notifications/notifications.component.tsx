import React, {useState, useEffect} from 'react';
import Styles from './notifications.styles';
import {notificationsData} from "./notifications.data";
import {NotificationType} from "../../types/notification.type";
import moment from 'moment';
import {useTranslation} from "../../modules/i18n/i18n.hook";
import Notification from "./components/notification/notification.component";
import DataPagination from "../../components/data-pagination/data-pagination.component";
import api from "../../managers/api.manager";
import {EP_GET_NOTIFICATIONS} from "../../enums/api.enum";
import logger from "../../managers/logger.manager";

type Props = {};
const Notifications = ({}:Props) => {
    const {t} = useTranslation();
    const [page, setPage] = useState(1);
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        api.get(EP_GET_NOTIFICATIONS)
            .then(res => res.data)
            .then(res => logger.success('NOTIFICATIONS', res))
    }, []);
    let seen = false;
    let lastDate = moment();
    return (
        <Styles>
            {notificationsData.slice((page-1)*10, page*10).map((n:NotificationType) => {
                const els: React.ReactNode[] = [];
                if(n.seen && !seen && page <= 1) {
                    els.push(<div className={'notification__hr'}><span>{t('notifications:all-done')}</span></div>)
                    els.push(<div className={'notification__date-label desktop'}>{moment(n.datetime).format('DD/MM/YYYY')}</div>)
                }else if(seen && moment(n.datetime).isBefore(lastDate, 'day')) {
                    els.push(<div className={'notification__date-label desktop'}>{moment(n.datetime).format('DD/MM/YYYY')}</div>)
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
