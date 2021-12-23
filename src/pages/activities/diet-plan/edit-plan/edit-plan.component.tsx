import { useState } from 'react'

import { AddIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import GoBack from '../../../../components/buttons/go-back/go-back.component'
import Card from '../../../../components/cards/card/card.component'
import Input from '../../../../components/form/input/input.component'
import { Title } from '../../../../components/typography'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import Counter from '../../components/counter/counter.component'
import ActivitiesDialog from '../../components/dialog/activities-dialog.component'
import MealDayAccordion from '../../components/meal-day-accordion/meal-day-accordion.component'
import { Styles } from '../../styles/edit-plan.styles'

interface EditDietPlanProps {
  onClose: () => void
}

export default function EditDietPlan({ onClose }: EditDietPlanProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const isMobile = useIsMobile()
  const [count, setCount] = useState(2)

  const content = (
    <>
      <Styles>
        <Card className="EditPlan__overview">
          {!isMobile && (
            <>
              <GoBack spacing={4} onClick={onClose}>
                Go Back to Overview
              </GoBack>

              <div className="EditPlan__header">
                <Title>Edit Training Plan</Title>

                <div>
                  <Button onClick={() => setShowConfirm(true)}>Save</Button>
                </div>
              </div>
            </>
          )}

          <div className="EditPlan__controls">
            <Input
              id="edit-training-plan-name"
              label="Diet Plan Name"
              placeholder="Name"
              className="EditPlan__input"
            />

            <Counter value={count} onChange={(value) => setCount(value)} />
          </div>
        </Card>

        <MealDayAccordion />
        <MealDayAccordion />

        <div className="EditPlan__add-new-day">
          <AddIcon />
          Add Workout Day
        </div>
      </Styles>

      <ActivitiesDialog
        name="Make Change Plan"
        description="You’re about to making changes to the following training plan:"
        title="High Intensity Plan"
        alertTitle="Read this before activating plan!"
        alert={
          <ul>
            <li>
              A new revision of your training plan will be created and it will
              become active. All your workout entires on your calender from this
              day will be updated.
            </li>
            <li>
              This will also make changes to your current training split to use
              the changes you just made.
            </li>
          </ul>
        }
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        actions={{
          yes: 'Looks Good, Save Changes',
          cancel: 'Cancel',
          layout: 'between',
          onYes: () => {},
          onCancel: () => setShowConfirm(false)
        }}
      />
    </>
  )

  return isMobile ? (
    <MobilePage
      title="Edit Training Plan"
      actionComponent={
        <Button onClick={() => setShowConfirm(true)}>Save</Button>
      }
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
