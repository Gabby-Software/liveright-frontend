import { useState } from 'react'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm
} from 'react-hook-form'

import { AddIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import GoBack from '../../../../components/buttons/go-back/go-back.component'
import Card from '../../../../components/cards/card/card.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import Input from '../../../../components/form/input/input.component'
import { Title } from '../../../../components/typography'
import useTrainingPlan from '../../../../hooks/api/activities/useTrainingPlan'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import MakeChangesDialog from '../../components/dialog/make-changes-dialog/make-changes-dialog.component'
import WorkoutDayAccordion from '../../components/workout-day-accordion/workout-day-accordion.component'
import { Styles } from '../../styles/edit-plan.styles'

interface AddTrainingPlanProps {
  onClose: () => void
  editId?: number
}

const defaultValues = {
  name: '',
  account_id: null,
  scheduled_start_on: '',
  scheduled_end_on: '',
  days: []
}

function createDay(dayIndex: number) {
  return {
    name: `Workout day ${dayIndex}`,
    activities: []
  }
}

export default function AddTrainingPlan({
  onClose,
  editId
}: AddTrainingPlanProps) {
  const [dayIndex, setDayIndex] = useState(0)
  const isMobile = useIsMobile()
  const [makeChangesDialog, setMakeChangesDialog] = useState(false)

  const trainingPlan = useTrainingPlan()

  const methods = useForm({
    defaultValues
  })

  const daysArray = useFieldArray({
    control: methods.control,
    name: 'days' as never,
    keyName: 'id'
  })

  const handleSubmit = (values: any) => {
    trainingPlan.onAdd(values)
    // console.log(values)
  }

  const handleSave = () => {
    if (editId) {
      setMakeChangesDialog(true)
    } else {
      methods.handleSubmit(handleSubmit)()
    }
  }

  const handleDayAdd = () => {
    const newDayIndex = dayIndex + 1
    daysArray.append(createDay(newDayIndex))
    setDayIndex(newDayIndex)
  }

  const content = (
    <>
      <FormProvider {...methods}>
        <Styles>
          <Card className="EditPlan__overview">
            {!isMobile && (
              <>
                <GoBack spacing={4} onClick={onClose}>
                  {editId ? 'Go Back to Overview' : 'Go Back to listing'}
                </GoBack>

                <div className="EditPlan__header">
                  <Title>
                    {editId ? 'Edit Training Plan' : 'Create Training Plan'}
                  </Title>

                  <div>
                    <Button onClick={handleSave}>Save</Button>
                  </div>
                </div>
              </>
            )}

            <div className="EditPlan__controls">
              <Controller
                name="name"
                render={({ field: { value, name } }) => (
                  <Input
                    id="add-training-plan-name"
                    label="Training Plan Name"
                    placeholder="Name"
                    className="EditPlan__input"
                    value={value}
                    onChange={(e) => methods.setValue(name, e.target.value)}
                  />
                )}
              />

              <Controller
                name="scheduled_start_on"
                render={({ field: { name, value } }) => (
                  <DatePicker
                    id="add-training-plan-start"
                    placeholder="Pick start date"
                    label="Start date"
                    value={value}
                    onChange={(e, date) => methods.setValue(name, date)}
                  />
                )}
              />
              <Controller
                name="scheduled_end_on"
                render={({ field: { name, value } }) => (
                  <DatePicker
                    id="add-training-plan-end"
                    placeholder="Pick end date"
                    label="End date"
                    value={value}
                    onChange={(e, date) => methods.setValue(name, date)}
                  />
                )}
              />
              {/*<Counter />*/}
            </div>
          </Card>

          {daysArray.fields.map((day, index) => (
            <WorkoutDayAccordion
              key={day.id}
              index={index}
              onRemove={() => daysArray.remove(index)}
            />
          ))}

          <div className="EditPlan__add-new-day" onClick={handleDayAdd}>
            <AddIcon />
            Add Workout Day
          </div>
        </Styles>
      </FormProvider>

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
