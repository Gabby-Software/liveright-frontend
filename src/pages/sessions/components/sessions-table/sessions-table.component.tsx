import React, {useState, useMemo, ReactElement, useEffect} from 'react';
import {Avatar} from "antd";
import {UserOutlined} from '@ant-design/icons';
import Styles from './sessions-table.styles';
import {PaginationMetaType} from "../../../../types/pagination-meta.type";
import DataTable from "../../../../components/data-table/data-table.component";
import {SessionType} from "../../../../types/session.type";
import {toPmAm} from "../../../../pipes/to-pm-am.pipe";
import DataPagination from "../../../../components/data-pagination/data-pagination.component";
import DesktopSessionsFilters from "../desktop-sessions-filters/desktop-sessions-filters.component";
import {FilterValues} from "../../../../types/sessions-filter.type";

interface Props {
    data: SessionType[];
    renderOptions?: (session: SessionType) => ReactElement;
    withFilter?: boolean;
}

const SessionsTable: React.FC<Props> = (props) => {
    const {data, renderOptions, withFilter} = props;
    const [sessions, setSessions] = useState(data);
    const [pagMeta, setPagMeta] = useState<PaginationMetaType>({current_page: 1, per_page: 10, total: sessions.length});
    const {current_page, total, per_page} = pagMeta;
    const {labels, keys} = useMemo(() => {
        const labels = [
            'sessions:type',
            'sessions:date',
            'sessions:time',
            'sessions:with',
        ]
        const keys = ['type', 'date', 'time', 'name']

        if (renderOptions) {
            labels.push('sessions:options')
            keys.push('options')
        }

        return {labels, keys}
    }, [renderOptions]);

    const handleFilterChange = (values: FilterValues) => {
        const {dateType, type} = values;
        let results = data;

        if (type !== 'All') {
            results = results.filter((it) => it.type.includes(type));
        }

        if (dateType.trim()) {
            results = results.filter((it) => {
                const isDate = /^\d{4}(-\d{2})*$/.test(dateType)

                if (isDate) {
                    return it.date.includes(dateType)
                } else {
                    return it.type.toLowerCase().includes(dateType.toLowerCase())
                }
            });
        }

        setSessions(results)
    }

    useEffect(() => {
        setPagMeta({current_page: 1, per_page: 10, total: sessions.length})
    }, [sessions])

    return (
      <Styles>
          {withFilter && <DesktopSessionsFilters onChange={handleFilterChange} />}
          <DataTable
            labels={labels}
            keys={keys}
            data={sessions.slice((current_page-1)*per_page, current_page*per_page)}
            render={{
              time: ({time}: SessionType) => toPmAm(time),
              name: ({name}: SessionType) => (
                  <div>
                      <Avatar size="small" icon={<UserOutlined />} />
                      {name}
                  </div>
              ),
              options: (item) => renderOptions ? renderOptions(item) : React.Fragment
          }}/>
          <DataPagination
              page={current_page}
              setPage={(p:number) => setPagMeta({...pagMeta, current_page:p})}
              total={total}
          />
      </Styles>
    );
};

export default SessionsTable;
