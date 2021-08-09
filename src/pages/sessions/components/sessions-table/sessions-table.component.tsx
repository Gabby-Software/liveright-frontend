import React, {useState, useMemo, ReactElement, useEffect} from 'react';
import moment from "moment";
import Styles from './sessions-table.styles';
import DataTable from "../../../../components/data-table/data-table.component";
import {SessionFilter, SessionType} from "../../../../types/session.type";
import DataPagination from "../../../../components/data-pagination/data-pagination.component";
import SessionsFilters from "../sessions-filters/sessions-filters.component";
import {useAuth} from "../../../../hooks/auth.hook";
import userTypes from "../../../../enums/user-types.enum";
import {PaginatedDataType} from "../../../../types/paginated-data.type";
import {useClients} from "../../../../hooks/clients.hook";
import {useClientsTrainer} from "../../../../hooks/clients-trainer.hook";
import SessionUserAvatar from "../session-user-avatar/session-user-avatar.component";

interface Props {
    sessions: PaginatedDataType<SessionType>;
    getSessions: (page: number, filter?: SessionFilter) => void;
    additionalFilters?: SessionFilter;
    renderOptions?: (session: SessionType) => ReactElement;
    withFilter?: boolean;
}

const SessionsTable: React.FC<Props> = (props) => {
    const {sessions, getSessions, additionalFilters, renderOptions, withFilter} = props;
    const {data, meta} = sessions;
    const {current_page, total} = meta;
    const isTrainerType = useAuth().type === userTypes.TRAINER;
    const clients = useClients();
    const trainer = useClientsTrainer();
    const [filter, setFilter] = useState<SessionFilter>({});
    const {labels, keys} = useMemo(() => {
        const labels = [
            'sessions:type',
            'sessions:date',
            'sessions:time',
            'sessions:with',
        ]
        const keys = ['type', 'starts_at', 'duration', 'with']

        if (renderOptions) {
            labels.push('sessions:options')
            keys.push('options')
        }

        return {labels, keys}
    }, [renderOptions]);

    const handlePageSet = (page: number) => {
        getSessions(page, {...filter, ...additionalFilters})
    }

    useEffect(() => {
        handlePageSet(1)
    }, [filter])


    return (
      <Styles>
          {withFilter && <SessionsFilters onUpdate={setFilter} />}
          <DataTable
            labels={labels}
            keys={keys}
            data={data}
            render={{
              with: (it: SessionType) => {
                  let person;
                  if (isTrainerType) {
                    person = clients.data.data.find(client => client.id === it.client?.id) as {first_name: string;last_name:string;avatar?:{url?: string}}
                  } else {
                    person = trainer as {first_name: string;last_name:string;avatar?:{url?: string}}
                  }

                  if (!person) {
                      return null
                  }

                  return <SessionUserAvatar first_name={person.first_name} last_name={person.last_name} avatar={person.avatar} />
              },
              starts_at: ({starts_at}: SessionType) => {
                  return moment(starts_at).format("YYYY-MM-DD")
              },
              duration: ({duration}: SessionType) => {
                  return moment(duration, "HH:mm:ss").format("HH:mm")
              },
              options: (item) => renderOptions ? renderOptions(item) : React.Fragment
          }}/>
          <DataPagination
              page={current_page}
              setPage={handlePageSet}
              total={total}
          />
      </Styles>
    );
};

export default SessionsTable;
