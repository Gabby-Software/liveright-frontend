import React, { useState } from 'react'

import Card from '../../../../components/card/card.style'
import { useAuth } from '../../../../hooks/auth.hook'
import { useInfiniteScroll } from '../../../../hooks/infinite-scroll.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { capitalize } from '../../../../pipes/capitalize.pipe'
import { date } from '../../../../pipes/date.pipe'
import { trainingSplitData } from '../../plans.data'
import Styles from './training-splits-mobile.styles'

const TrainingSplitsMobile = () => {
  const [page, setPage] = useState(1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { type } = useAuth()
  const { t } = useTranslation()
  useInfiniteScroll((p: number) => {
    setPage(p)
    return Promise.resolve(p - 1 > trainingSplitData.length / 10)
  })
  return (
    <Styles>
      {trainingSplitData
        .slice(0, page * 10)
        .map(({ split_name, start_date, status }) => (
          // eslint-disable-next-line react/jsx-key
          <Card className={'split__card'}>
            <div className={'split__left'}>
              <div className={'split__name'}>{split_name}</div>
              <div className={'split__date'}>
                {t('plans:started')} {date(start_date)}
              </div>
            </div>
            <div className={`split__status split__status__${status}`}>
              {capitalize(status)}
            </div>
          </Card>
        ))}
    </Styles>
  )
}

export default TrainingSplitsMobile
