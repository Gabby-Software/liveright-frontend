import React, {useState, useMemo, ReactElement, useEffect} from 'react';
import {Avatar} from "antd";
import {UserOutlined} from '@ant-design/icons';
import Styles, {SessionCard} from './sessions-mobile-cards.styles';
import {PaginationMetaType} from "../../../../types/pagination-meta.type";
import {SessionType} from "../../../../types/session.type";
import DataPagination from "../../../../components/data-pagination/data-pagination.component";
import {FilterValues} from "../../../../types/sessions-filter.type";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import moment from "moment";
import MobileSessionFilter from "../mobile-session-filter/mobile-session-filter.component";
import PageSubtitle from "../../../../components/titles/page-subtitle.styles";

interface Props {
    data: SessionType[];
    renderOptions?: (session: SessionType) => ReactElement;
    withFilter?: boolean;
    title?: boolean;
}

const SessionsCards: React.FC<Props> = (props) => {
    const {t} = useTranslation()
    const {data, renderOptions, withFilter, title} = props;
    const [sessions, setSessions] = useState(data);
    const [pagMeta, setPagMeta] = useState<PaginationMetaType>({current_page: 1, per_page: 10, total: sessions.length});
    const {current_page, total, per_page} = pagMeta;

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
          {title && <PageSubtitle>{title}</PageSubtitle>}
          {withFilter && <MobileSessionFilter onChange={handleFilterChange} />}
          {sessions.slice((current_page-1)*per_page, current_page*per_page).map((it) => {
              const {name, type, date, time} = it;
              const day = moment(date).format("DD");
              const month = moment(date).format("MMMM");

              return (
                  <SessionCard>
                      <span>{type}</span>
                      <span className="session-card-with">{t("sessions:with").toLowerCase()}</span>
                      <div className="session-card-name">
                          <Avatar size="small" icon={<UserOutlined />} />
                          {name}
                      </div>
                      <div className="sessions-card-datetime">
                          <div>
                              <span>{day}</span>
                              <span>{month.toUpperCase()}</span>
                          </div>
                          <span>{time}</span>
                      </div>
                      {renderOptions && renderOptions(it)}
                  </SessionCard>
              )
          })}
          <DataPagination
              page={current_page}
              setPage={(p:number) => setPagMeta({...pagMeta, current_page:p})}
              total={total}
          />
      </Styles>
    );
};

export default SessionsCards;
