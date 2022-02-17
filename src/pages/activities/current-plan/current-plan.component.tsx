import { Skeleton } from 'antd'
import { useState } from 'react'

import Button from '../../../components/buttons/button/button.component'
import Card from '../../../components/cards/card/card.component'
import Tabs from '../../../components/tabs/tabs.component'
import { Title } from '../../../components/typography'
import { Routes } from '../../../enums/routes.enum'
import useDietPlan from '../../../hooks/api/activities/useDietPlan'
import useTrainingPlan from '../../../hooks/api/activities/useTrainingPlan'
import useTrainingSplit from '../../../hooks/api/activities/useTrainingSplit'
import { useAuth } from '../../../hooks/auth.hook'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import MobilePage from '../../../layouts/mobile-page/mobile-page.component'
import { getRoute } from '../../../utils/routes'
import CurrentPlanOverviewCard from '../components/current-plan-overview-card/current-plan-overview-card.component'
import CurrentActiveSplit from './current-active-split.component'
import CurrentActiveDP from './current-active-split-none/current-active-dp.component'
import CurrentActiveTP from './current-active-split-none/current-active-tp.component'
import { Styles } from './current-plan.styles'

export default function CurrentPlan() {
  const isMobile = useIsMobile()
  const { id: userId } = useAuth()
  const [activeTab, setActiveTab] = useState('tp')

  const { revision: TS, isLoading } = useTrainingSplit({
    clientId: userId.toString(),
    id: 'current',
    revisionId: 'current'
  })
  const { revision: TP } = useTrainingPlan({
    clientId: String(userId),
    id: 'current',
    revisionId: 'current'
  })
  const { revision: DP } = useDietPlan({
    clientId: String(userId),
    id: 'current',
    revisionId: 'current'
  })
  console.log('TS', TP)

  const TABS = [
    {
      label: 'Traning Plans',
      key: 'tp',
      renderContent: () => <CurrentActiveTP revision={TP} />
    },
    {
      label: 'Diet Plans',
      key: 'dp',
      renderContent: () => <CurrentActiveDP revision={DP} />
    }
  ]

  const noActivity = !TS?._id && !TP?._id && !DP?._id

  const content = (
    <Styles>
      <Card className="CurrentPlan__card">
        {!isMobile && (
          <div className="CurrentPlan__title-container">
            <Title>Your Current Plan</Title>

            <Button>Edit Training Spilt</Button>
          </div>
        )}

        {isLoading ? (
          <Skeleton />
        ) : noActivity ? (
          <div className="CurrentPlan__no-activity">
            {"Seems like you don't have any activities yet :("}
          </div>
        ) : (
          <>
            {!TS?._id ? (
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                tabs={TABS}
                className={isMobile ? '' : 'clients__tabs'}
                justify={isMobile ? 'between' : undefined}
              />
            ) : (
              <>
                <CurrentActiveSplit revision={TS} />

                <p className="CurrentPlan__log-text">
                  Doing or eating something else today?{' '}
                  <span>Log Additional Activity</span>
                </p>
              </>
            )}
          </>
        )}
      </Card>

      {!noActivity && (
        <Card className="CurrentPlan__card">
          <p className="CurrentPlan__text CurrentPlan__overview-title">
            Here’s an overview of what’s currently filling your calendar
          </p>

          <div>
            <CurrentPlanOverviewCard
              title="Training Split"
              noName={!TS?._id}
              name={TS?.main?.name}
              link={
                !!TS?.main?._id && !!TS?._id
                  ? getRoute(Routes.ACTIVITIES_TS_EDIT, {
                      clientId: userId,
                      id: TS?.main?._id,
                      revisionId: TS?._id
                    })
                  : getRoute(Routes.ACTIVITIES_TS, { clientId: userId })
              }
            />
            <CurrentPlanOverviewCard
              title="Diet Plan"
              noName={!DP?._id}
              name={DP?.main?.name}
              link={
                !!DP?.main?._id && !!DP?._id
                  ? getRoute(Routes.ACTIVITIES_DP_ID, {
                      clientId: userId,
                      id: DP?.main?._id,
                      revisionId: DP?._id
                    })
                  : getRoute(Routes.ACTIVITIES_DP, { clientId: userId })
              }
            />
            <CurrentPlanOverviewCard
              title="Training Plan"
              noName={!TP?._id}
              name={TP?.main?.name}
              link={
                !!TP?.main?._id && !!TP?._id
                  ? getRoute(Routes.ACTIVITIES_TP_ID, {
                      clientId: userId,
                      id: TP?.main?._id,
                      revisionId: TP?._id
                    })
                  : getRoute(Routes.ACTIVITIES_TP, { clientId: userId })
              }
            />
          </div>
        </Card>
      )}
    </Styles>
  )

  return isMobile ? (
    <MobilePage
      title="Your Current Plan"
      actionComponent={<Button>Edit split</Button>}
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
