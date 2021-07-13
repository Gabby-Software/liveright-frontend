import React, {useState, useEffect, useMemo, ComponentType} from 'react';
import Styles from './desktop-sessions.styles';
import {useAuth} from "../../../hooks/auth.hook";
import {PaginationMetaType} from "../../../types/pagination-meta.type";
import {invoices} from "../../invoices/invoices.data";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import userTypes from "../../../enums/user-types.enum";
import {InvoiceFiltersType} from "../../../types/invoice-filters.type";
import {FormikHelpers} from "formik";
import DesktopSessionsFilters
    from "../../../components/sessions/desktop-sessions-filters/desktop-sessions-filters.component";
import DataTable from "../../../components/data-table/data-table.component";
import {sessions} from "../sessions.data";
import {SessionType} from "../../../types/session.type";
import {toPmAm} from "../../../pipes/to-pm-am.pipe";
import {TableActionType} from "../../../types/table-action.type";
import {ReactComponent as EditIcon} from "../../../assets/media/icons/edit.svg";
import {ReactComponent as TrashIcon} from "../../../assets/media/icons/trash.svg";
import {ReactComponent as CalendarIcon} from "../../../assets/media/icons/calendar.svg";
import ActionIcon from "../../../components/action-icon/action-icon.component";
import SessionRescheduleModal
    from "../../../components/sessions/session-reschedule-modal/session-reschedule-modal.component";
import SessionEditModal from "../../../components/sessions/session-edit-modal/session-edit-modal.component";
import DataPagination from "../../../components/data-pagination/data-pagination.component";

const DesktopSessions = () => {
    const [rescheduleOpen, setRescheduleOpen] = useState<SessionType|null>(null);
    const [editOpen, setEditOpen] = useState(0);
    const {type} = useAuth();
    const [pagMeta, setPagMeta] = useState<PaginationMetaType>({current_page: 1, per_page: 10, total: invoices.length});
    const {current_page, total, per_page} = pagMeta;
    const {t} = useTranslation();
    const labels = type === userTypes.TRAINER ? [
        'sessions:client-name',
        'sessions:type',
        'sessions:date',
        'sessions:time',
        ''
    ] : [
        'sessions:trainer-name',
        'sessions:type',
        'sessions:date',
        'sessions:time',
        ""
    ];
    const keys = ['name', 'type', 'date', 'time', 'actions'];
    const deleteSession = () => {

    };
    const actions: {icon: ComponentType<any>, title: string, onClick: (s:SessionType) => () => void}[] = useMemo(() => {
        return type === userTypes.TRAINER ? [
            {icon: EditIcon, title: t('edit'), onClick: (session: SessionType) => () => setEditOpen(1)},
            {icon: TrashIcon, title: t('delete'), onClick: (session: SessionType) => () => {}},
        ] : [
            {icon: CalendarIcon, title: t('sessions:reschedule'), onClick: (session: SessionType) => () => setRescheduleOpen(session)}
        ];
    }, [type]);

    return (
      <Styles>
          <div className={'sessions__data'}>
              <DesktopSessionsFilters/>
              <DataTable labels={labels} keys={keys} data={sessions.slice((current_page-1)*per_page, current_page*per_page)} render={{
                  time: (item: SessionType) => toPmAm(item.time),
                  actions: (item:SessionType) => actions.map(a => <ActionIcon {...a} onClick={a.onClick(item)}/>)
              }}/>
              <DataPagination page={current_page} setPage={(p:number) => setPagMeta({...pagMeta, current_page:p})} total={total}/>
          </div>
          <SessionRescheduleModal session={rescheduleOpen} onClose={() => setRescheduleOpen(null)}/>
          <SessionEditModal/>
      </Styles>
    );
};

export default DesktopSessions;
