import React, {useState, useMemo, ComponentType} from 'react';
import moment from 'moment'
import Styles, {AddSessionAction} from './desktop-sessions.styles';
import {useAuth} from "../../../../hooks/auth.hook";
import {PaginationMetaType} from "../../../../types/pagination-meta.type";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import userTypes from "../../../../enums/user-types.enum";
import DataTable from "../../../../components/data-table/data-table.component";
import {sessions} from "../../sessions.data";
import {SessionType} from "../../../../types/session.type";
import {toPmAm} from "../../../../pipes/to-pm-am.pipe";
import {ReactComponent as EditIcon} from "../../../../assets/media/icons/edit.svg";
import {ReactComponent as TrashIcon} from "../../../../assets/media/icons/trash.svg";
import {ReactComponent as CalendarIcon} from "../../../../assets/media/icons/calendar.svg";
import ActionIcon from "../../../../components/action-icon/action-icon.component";
import SessionRescheduleModal
    from "../../../../components/sessions/session-reschedule-modal/session-reschedule-modal.component";
import SessionEditModal from "../../../../components/sessions/session-edit-modal/session-edit-modal.component";
import DataPagination from "../../../../components/data-pagination/data-pagination.component";
import PageSubtitle from '../../../../components/titles/page-subtitle.styles'
import {useTitleContent} from "../../../../layouts/desktop-layout/desktop-layout.component";
import SessionAddModal from "../../../../components/sessions/session-add-modal/session-add-modal.component";
import AddSession from "../../sections/add-session/add-session.component";

const DesktopSessions = () => {
    const {t} = useTranslation();
    const {type} = useAuth();
    const [rescheduleOpen, setRescheduleOpen] = useState<SessionType|null>(null);
    const [editOpen, setEditOpen] = useState<SessionType|null>(null);
    const [addOpen, setAddOpen] = useState<boolean>(false);
    const [pagMeta, setPagMeta] = useState<PaginationMetaType>({current_page: 1, per_page: 10, total: sessions.length});
    useTitleContent(
        <AddSessionAction type={'primary'} onClick={()=> setAddOpen(true)}>{t('sessions:add')}</AddSessionAction>
    );
    const {current_page, total, per_page} = pagMeta;
    const labels = type === userTypes.TRAINER ? [
        'sessions:client-name',
        'sessions:type',
        'sessions:date',
        'sessions:time',
    ] : [
        'sessions:type',
        'sessions:date',
        'sessions:time',
        'sessions:with',
    ];
    const keys = ['type', 'date', 'time', 'name'];
    const upcomingKeys = ['type', 'date', 'time', 'name', 'options'];
    const {upcomingSessions, pastSessions} = sessions.reduce<{
        upcomingSessions: SessionType[],
        pastSessions:SessionType[]
    }>((acc, session) => {
        const {date, time} = session
        const isPast = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm").isBefore(moment());

        if (isPast) {
            acc.pastSessions.push(session)
        } else {
            acc.upcomingSessions.push(session)
        }

        return acc
    }, {
        upcomingSessions: [],
        pastSessions: [],
    })
    const actions: {icon: ComponentType<any>, title: string, onClick: (s:SessionType) => () => void}[] = useMemo(() => {
        return type === userTypes.TRAINER ? [
            {icon: EditIcon, title: t('edit'), onClick: (session: SessionType) => () => setEditOpen(session)},
            {icon: TrashIcon, title: t('delete'), onClick: (session: SessionType) => () => {}},
        ] : [
            {icon: CalendarIcon, title: t('sessions:reschedule'), onClick: (session: SessionType) => () => setRescheduleOpen(session)}
        ];
    }, [type]);

    return (
      <Styles>
          <div className={'sessions'}>
              <PageSubtitle>{t('sessions:upcoming-title')}</PageSubtitle>
              <DataTable
                className={'sessions__upcoming-table'}
                labels={[...labels, 'sessions:options']}
                keys={upcomingKeys}
                data={upcomingSessions.slice((current_page-1)*per_page, current_page*per_page)}
                render={{
                  time: (item: SessionType) => toPmAm(item.time),
                  actions: (item:SessionType) => (
                      <div className={'sessions__activities'}>{
                          actions.map(a => <ActionIcon {...a} onClick={a.onClick(item)}/>)
                      }</div>
                  )
              }}/>
              <PageSubtitle>{t('sessions:past-title')}</PageSubtitle>
              <DataTable
                labels={labels}
                keys={keys}
                data={pastSessions.slice((current_page-1)*per_page, current_page*per_page)}
                render={{
                  time: (item: SessionType) => toPmAm(item.time),
                  actions: (item:SessionType) => (
                      <div className={'sessions__activities'}>{
                          actions.map(a => <ActionIcon {...a} onClick={a.onClick(item)}/>)
                      }</div>
                  )
              }}/>
              <DataPagination page={current_page} setPage={(p:number) => setPagMeta({...pagMeta, current_page:p})} total={total}/>
          </div>
          <SessionRescheduleModal session={rescheduleOpen} onClose={() => setRescheduleOpen(null)}/>
          <SessionEditModal session={editOpen} onClose={() => setEditOpen(null)}/>
          <AddSession isOpen={addOpen} onClose={() => setAddOpen(false)}/>
      </Styles>
    );
};

export default DesktopSessions;
