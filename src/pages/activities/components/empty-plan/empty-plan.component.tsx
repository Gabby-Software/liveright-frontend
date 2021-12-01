import Card from '../../../../components/cards/card/card.component'
import { Title } from '../../../../components/typography'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import EmptyPlanCard, {
  EmptyPlanCardProps
} from '../../components/empty-plan-card/empty-plan-card.component'
import { Styles } from '../../styles/empty-plan.styles'

interface EmptyPlanProps extends EmptyPlanCardProps {
  title: string
}

export default function EmptyPlan({ title, ...props }: EmptyPlanProps) {
  const isMobile = useIsMobile()
  return (
    <Styles>
      <Card>
        {!isMobile && <Title className="EmptyPlan__title">{title}</Title>}

        <EmptyPlanCard {...props} />
      </Card>
    </Styles>
  )
}
