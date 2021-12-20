import { CrossIcon, EditIcon } from '../../../../assets/media/icons'
import {
  FoodIcon,
  WorkoutIcon
} from '../../../../assets/media/icons/activities'
import Button from '../../../../components/buttons/button/button.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import { VoidAction } from '../../../../types/actions.type'
import { ActionsLayout } from '../../../../types/actions-layout.type'
import { PlanOverview } from '../../../../types/trainer-plan.type'
import Alert from '../alert/alert.component'
import { ActivitiesDialogStyles, Styles } from './activities-dialog.styles'

export type DateProps = {
  label: string | JSX.Element
  value: string
}

export type PlanProps = {
  trainings: PlanOverview[]
  meals: PlanOverview[]
}

export interface ActivitiesDialogProps {
  open: boolean
  onClose: () => void
  name: string
  description: string | JSX.Element
  title: string | JSX.Element
  body?: string | JSX.Element
  date?: DateProps
  alert?: string | JSX.Element
  alertTitle?: string;
  plans?: PlanProps
  actions: {
    yes?: string
    onYes: VoidAction
    cancel?: string
    onCancel: VoidAction
    layout?: ActionsLayout
  }
}

export default function ActivitiesDialog({
  onClose,
  open,
  name,
  description,
  title,
  body,
  date,
  alert,
  alertTitle,
  plans,
  actions
}: ActivitiesDialogProps) {
  const handleEdit = (item: PlanOverview) => {
    console.log(item)
  }

  const planLabel =
    'This split has the following meal plan and training plan days'
  return (
    <ActivitiesDialogStyles
      visible={open}
      onCancel={onClose}
      closeIcon={<CrossIcon />}
      footer={false}
      width="100%"
      centered
    >
      <Styles actionsLayout={actions.layout ?? 'left'}>
        <p className="ActivitiesDialog__name">{name}</p>

        <p className="ActivitiesDialog__description">{description}</p>
        <p className="ActivitiesDialog__title">{title}</p>
        <div className="ActivitiesDialog__divider" />

        {body && <div className="ActivitiesDialog__body">{body}</div>}
        {date && (
          <DatePicker
            id="ActivitiesDialog-date"
            label={date.label}
            value={date.value}
            placeholder="Start date"
            className="ActivitiesDialog__control"
          />
        )}

        {alert && <Alert className="ActivitiesDialog__alert" title={alertTitle} content={alert} />}

        {plans && (
          <div className="ActivitiesDialog__plans">
            <p className="plans-label">{planLabel}</p>
            <div className="plans-cards">
              {plans.trainings && (
                <div className="trainings">
                  <div className="cover">
                    <div className="icon-wrapper">
                      <WorkoutIcon className="cover-icon" />
                    </div>
                    <span className="cover-label">Training Plan</span>
                  </div>
                  {plans.trainings.map((item) => (
                    <PlanCard item={item} onEdit={handleEdit} key={item.id} />
                  ))}
                </div>
              )}
              {plans.meals && (
                <div className="meals">
                  <div className="cover">
                    <div className="icon-wrapper">
                      <FoodIcon className="cover-icon" />
                    </div>

                    <span className="cover-label">Meal Plan</span>
                  </div>
                  {plans.meals.map((item) => (
                    <PlanCard item={item} onEdit={handleEdit} key={item.id} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="ActivitiesDialog__actions">
          <Button onClick={actions.onYes}>{actions.yes ?? 'Yes'}</Button>
          <Button variant="dark" onClick={actions.onCancel}>
            {actions.cancel ?? 'Cancel'}
          </Button>
        </div>
      </Styles>
    </ActivitiesDialogStyles>
  )
}

type PlanCardProps = {
  item: PlanOverview
  onEdit: (item: PlanOverview) => void
}

function PlanCard(props: PlanCardProps) {
  const { item, onEdit } = props
  return (
    <div className="plan-card">
      {item.title}
      <EditIcon className="plan-card-edit" onClick={() => onEdit(item)} />
    </div>
  )
}
