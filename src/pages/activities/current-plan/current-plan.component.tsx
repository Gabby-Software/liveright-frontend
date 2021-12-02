import { CalendarIcon, CaretLeftIcon } from '../../../assets/media/icons'
import {
  ExerciseIcon,
  FoodIcon,
  WorkoutIcon
} from '../../../assets/media/icons/activities'
import Button from '../../../components/buttons/button/button.component'
import IconButton from '../../../components/buttons/icon-button/icon-button.component'
import Card from '../../../components/cards/card/card.component'
import { Title } from '../../../components/typography'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import MobilePage from '../../../layouts/mobile-page/mobile-page.component'
import { getColorCarry } from '../../../pipes/theme-color.pipe'
import CurrentPlanAccordion from '../components/current-plan-accordion/current-plan-accordion.component'
import CurrentPlanCard from '../components/current-plan-card/current-plan-card.component'
import CurrentPlanOverviewCard from '../components/current-plan-overview-card/current-plan-overview-card.component'
import { Styles } from './current-plan.styles'

const DATA = [
  {
    icon: <WorkoutIcon />,
    time: '10:00',
    title: 'High Intensity Workout',
    color: getColorCarry('orange_50'),
    action: '4 Exercises',
    content: ['10 Squats x 3 min', '10 Squats x 3 min', '10 Squats x 3 min']
  },
  {
    icon: <FoodIcon />,
    time: '10:00',
    title: 'Lunch',
    color: getColorCarry('primary_v2'),
    action: '340 kcal',
    content: [
      'Chicken Brest Tender  -  100g',
      'Brown Rice  -  50g',
      'Red Apple'
    ]
  },
  {
    icon: <ExerciseIcon />,
    time: '19:00',
    title: 'High Intensity Workout',
    color: getColorCarry('blue_50'),
    action: 'See Details',
    content: ['10 Squats x 3 min', '10 Squats x 3 min', '10 Squats x 3 min']
  }
]

export default function CurrentPlan() {
  const isMobile = useIsMobile()

  const calendarToggle = (
    <div className="CurrentPlan__picker-btn-container">
      <IconButton size="sm" className="CurrentPlan__picker-btn">
        <CaretLeftIcon />
      </IconButton>
      <IconButton size="sm" className="CurrentPlan__picker-btn">
        <CaretLeftIcon />
      </IconButton>
    </div>
  )

  const openCalendarBtn = (
    <Button variant="text" size="sm">
      <CalendarIcon />
      <span>Open Calender</span>
    </Button>
  )

  const content = (
    <Styles>
      <Card className="CurrentPlan__card">
        {!isMobile && (
          <div className="CurrentPlan__title-container">
            <Title>Your Current Plan</Title>

            <Button>Edit Training Spill</Button>
          </div>
        )}

        {isMobile ? (
          <div className="CurrentPlan__picker-container">
            <div className="CurrentPlan__picker-row">
              <span className="CurrentPlan__picker-row-title">Today</span>
              {openCalendarBtn}
            </div>
            <div className="CurrentPlan__picker-row">
              <span className="CurrentPlan__picker-row-subtitle">
                September 15th
              </span>
              {calendarToggle}
            </div>
          </div>
        ) : (
          <div className="CurrentPlan__picker-container">
            <div className="CurrentPlan__picker">
              <p className="CurrentPlan__picker-title">
                Today, <span>September 15th</span>
              </p>
              {calendarToggle}
            </div>

            {openCalendarBtn}
          </div>
        )}

        <div className="CurrentPlan__divider" />

        <div>
          {DATA.map((row, index) =>
            isMobile ? (
              <CurrentPlanAccordion {...row} key={index} />
            ) : (
              <CurrentPlanCard {...row} key={index} />
            )
          )}
        </div>

        <p className="CurrentPlan__log-text">
          Doing or eating something else today?{' '}
          <span>Log Additional Activity</span>
        </p>
      </Card>

      <Card className="CurrentPlan__card">
        <p className="CurrentPlan__text CurrentPlan__overview-title">
          Here’s an overview of what’s currently filling your calendar
        </p>

        <div>
          <CurrentPlanOverviewCard
            title="Active Training Split"
            name="Reduce Bodyweight"
          />
          <CurrentPlanOverviewCard
            title="Active Diet Plan"
            name="Diet Plan #32 (Low Carb Day)"
          />
          <CurrentPlanOverviewCard
            title="Active Training Plan"
            name="High Intensity Training"
          />
        </div>
      </Card>
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
