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
import MakeChangesDialog from '../../components/dialog/make-changes-dialog/make-changes-dialog.component'
import WorkoutDayAccordion from '../../components/workout-day-accordion/workout-day-accordion.component'
import { Styles } from '../../styles/edit-plan.styles'

interface EditPlanProps {
  onClose: () => void
}

export default function EditPlan({ onClose }: EditPlanProps) {
  const isMobile = useIsMobile()
  const [makeChangesDialog, setMakeChangesDialog] = useState(false)
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
                  <Button onClick={() => setMakeChangesDialog(true)}>
                    Save
                  </Button>
                </div>
              </div>
            </>
          )}

          <div className="EditPlan__controls">
            <Input
              id="edit-training-plan-name"
              label="Training Plan Name"
              placeholder="Name"
              className="EditPlan__input"
            />

            <Counter />
          </div>
        </Card>

        <WorkoutDayAccordion />
        <WorkoutDayAccordion />

        <div className="EditPlan__add-new-day">
          <AddIcon />
          Add Workout Day
        </div>
      </Styles>

      <MakeChangesDialog
        open={makeChangesDialog}
        onClose={() => setMakeChangesDialog(false)}
      />
    </>
  )

  return isMobile ? (
    <MobilePage
      title="Edit Training Plan"
      actionComponent={
        <Button onClick={() => setMakeChangesDialog(true)}>Save</Button>
      }
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
