import React, {useState, ReactElement, useEffect} from 'react';

import {SessionType, SessionFilter} from "../../../../types/session.type";
import DataPagination from "../../../../components/data-pagination/data-pagination.component";
import SessionsFilter from "../sessions-filters/sessions-filters.component";
import PageSubtitle from "../../../../components/titles/page-subtitle.styles";
import SessionCard from "../session-mobile-card/session-mobile-card.component"
import {PaginatedDataType} from "../../../../types/paginated-data.type";

interface Props {
    sessions: PaginatedDataType<SessionType>;
    getSessions: (page: number, filter?: SessionFilter) => void;
    renderOptions?: (session: SessionType) => ReactElement;
    renderSwipeComponent?: (session: SessionType) => ReactElement;
    withFilter?: boolean;
    title?: boolean;
}

const SessionsCards: React.FC<Props> = (props) => {
    const {
        sessions,
        getSessions,
        renderOptions,
        withFilter,
        title,
        renderSwipeComponent
    } = props;
    const {data, meta} = sessions;
    const {current_page, total} = meta;
    const [filter, setFilter] = useState<SessionFilter>({});

    const handlePageSet = (page: number) => {
        getSessions(page, filter)
    }

    useEffect(() => {
        handlePageSet(1)
    }, [filter])

    return (
      <div>
          {title && <PageSubtitle>{title}</PageSubtitle>}
          {withFilter && <SessionsFilter onUpdate={setFilter} />}
          {data.map((it) => {
              return (
                  <SessionCard
                      session={it}
                      key={it.id}
                      renderSwipeComponent={renderSwipeComponent}
                      renderOptions={renderOptions}
                  />
              )
          })}
          <DataPagination
              page={current_page}
              setPage={getSessions}
              total={total}
          />
      </div>
    );
};

export default SessionsCards;
