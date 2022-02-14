import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import CurrentPlanAccordion from '../../components/current-plan-accordion/current-plan-accordion.component'
import CurrentPlanCard from '../../components/current-plan-card/current-plan-card.component'

interface IProps {
  revision: any
}
export default function CurrentActiveTP({ revision }: IProps) {
  const isMobile = useIsMobile()

  return (
    <>
      {!revision?.activities || revision?.activities?.length === 0 ? (
        <div className="CurrentPlan__no-activity">
          {"You don't have any activities for today :("}
        </div>
      ) : (
        revision?.activities.map(
          (row: { type: any; time: any }, index: number) =>
            isMobile ? (
              <CurrentPlanAccordion
                key={index}
                data={row}
                type={'workout'}
                scheduleTime={row.time || 'Not Set'}
              />
            ) : (
              <CurrentPlanCard
                key={index}
                data={row}
                type={'workout'}
                scheduleTime={row.time || 'Not Set'}
              />
            )
        )
      )}
    </>
  )
}
