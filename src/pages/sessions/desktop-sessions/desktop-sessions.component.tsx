import React, {useState, useEffect} from 'react';
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
import ActionIcon from "../../../components/action-icon/action-icon.component";

const DesktopSessions = () => {
    const [session, setSession] = useState<number | null>(null);
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
    ];
    const keys = type ===userTypes.TRAINER?[
        'name', 'type', 'date', 'time', 'actions'
    ] : [
        'name', 'type', 'date', 'time'
    ];
    const actions: TableActionType[] = [
        {icon: EditIcon, title: t('edit'), onClick: () =>{}},
        {icon: TrashIcon, title: t('delete'), onClick: () =>{}},
    ];

    return (
      <Styles>
          <div className={'sessions__data'}>
              <DesktopSessionsFilters/>
              <DataTable labels={labels} keys={keys} data={sessions.slice((current_page-1)*per_page, current_page*per_page)} render={{
                  time: (item: SessionType) => toPmAm(item.time),
                  actions: () => actions.map(a => <ActionIcon {...a}/>)
              }}/>
          </div>
      </Styles>
    );
};

export default DesktopSessions;
