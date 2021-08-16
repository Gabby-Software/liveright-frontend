import React, {useState, ReactElement, useEffect} from 'react';

import {SessionType, SessionFilter} from "../../../../types/session.type";
import DataPagination from "../../../../components/data-pagination/data-pagination.component";
import SessionsFilter from "../sessions-filters/sessions-filters.component";
import PageSubtitle from "../../../../components/titles/page-subtitle.styles";
import SessionCard from "../session-mobile-card/session-mobile-card.component"
import {PaginatedDataType} from "../../../../types/paginated-data.type";
import ActionIcon from "../../../../components/action-icon/action-icon.component";
import {ReactComponent as TrashIcon} from "../../../../assets/media/icons/trash.svg";
import {SwipeContent} from "./sessions-mobile-cards.styles";

interface Props {
    sessions: PaginatedDataType<SessionType>;
    getSessions: (page: number, filter?: SessionFilter) => void;
    renderOptions?: (session: SessionType) => ReactElement;
    onRemoveSession?: (id: number) => void;
    withFilter?: boolean;
    title?: boolean;
}

const SessionsCards: React.FC<Props> = (props) => {
    const {
        sessions,
        getSessions,
        renderOptions,
        onRemoveSession,
        withFilter,
        title,
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
                      renderOptions={renderOptions}
                      SwipeContent={onRemoveSession ? (
                          <SwipeContent>
                              <ActionIcon
                                  icon={TrashIcon}
                                  title="Remove"
                                  onClick={() => onRemoveSession(it.id)}
                              />
                          </SwipeContent>
                      ) : undefined}
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
