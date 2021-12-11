import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm
} from 'react-hook-form'
import * as yup from 'yup'

import { AddIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import GoBack from '../../../../components/buttons/go-back/go-back.component'
import Card from '../../../../components/cards/card/card.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import Error from '../../../../components/form/error/error.component'
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
  editId?: string
  revisionId?: string
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  scheduled_start_on: yup.string().required(),
  scheduled_end_on: yup.string().required(),
  days: yup.array().required()
})

const defaultValues: any = {
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
  editId,
  revisionId
}: AddTrainingPlanProps) {
  const [dayIndex, setDayIndex] = useState(0)
  const isMobile = useIsMobile()
  const [makeChangesDialog, setMakeChangesDialog] = useState(false)

  const { onAdd, onEdit, revision } = useTrainingPlan({
    id: editId,
    revisionId
  })

  const methods = useForm<any>({
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  const daysArray = useFieldArray({
    control: methods.control,
    name: 'days' as never,
    keyName: 'id'
  })

  useEffect(() => {
    methods.setValue('name', revision.name)
    methods.setValue('account_id', revision.account_id)
    methods.setValue('scheduled_start_on', revision.scheduled_start_on)
    methods.setValue('scheduled_end_on', revision.scheduled_end_on)
    methods.setValue('days', revision.days)
  }, [revision._id])

  const handleSubmit = (values: any) => {
    if (editId && revisionId) {
      onEdit(editId, revisionId, values, onClose)
    } else {
      onAdd(values, onClose)
    }
    // console.log(values)
  }

  const handleSave = () => {
    // if (editId) {
    //   setMakeChangesDialog(true)
    // } else {
    //   methods.handleSubmit(handleSubmit)()
    // }
    methods.handleSubmit(handleSubmit)()
  }

  const handleDayAdd = () => {
    const newDayIndex = dayIndex + 1
    daysArray.append(createDay(newDayIndex))
    setDayIndex(newDayIndex)
  }

  const { errors } = methods.formState

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
                    error={errors.name}
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
                    className="EditPlan__input"
                    value={value}
                    onChange={(e, date) => methods.setValue(name, date)}
                    error={errors.scheduled_start_on}
                  />
                )}
              />
              <Controller
                name="scheduled_end_on"
                render={({ field: { name, value } }) => (
                  <DatePicker
                    id="add-training-plan-end"
                    placeholder="Pick end date"
                    className="EditPlan__input"
                    label="End date"
                    value={value}
                    onChange={(e, date) => methods.setValue(name, date)}
                    error={errors.scheduled_end_on}
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
          {errors.days && <Error standalone="Add at least one day" />}
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
      actionComponent={<Button onClick={handleSave}>Save</Button>}
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
