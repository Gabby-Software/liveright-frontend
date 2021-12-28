import Card from '../../../../components/cards/card/card.component'
import { Title } from '../../../../components/typography'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { classes } from '../../../../pipes/classes.pipe'
import EmptyPlanCard, {
  EmptyPlanCardProps
} from '../../components/empty-plan-card/empty-plan-card.component'
import { Styles } from '../../styles/empty-plan.styles'

interface EmptyPlanProps extends EmptyPlanCardProps {
  title: string
  className?: string
}

export default function EmptyPlan({
  title,
  className,
  ...props
}: EmptyPlanProps) {
  const isMobile = useIsMobile()
  return (
    <Styles className={classes('EmptyPlan__card', className)}>
      <Card>
        {!isMobile && <Title className="EmptyPlan__title">{title}</Title>}

        <EmptyPlanCard {...props} />
      </Card>
    </Styles>
  )
}
