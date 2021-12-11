import { useState } from 'react'

import { AddIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Checkbox from '../../../../components/form/checkbox/checkbox.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import Input from '../../../../components/form/input/input.component'
import Label from '../../../../components/form/label/label.component'
import Select from '../../../../components/form/select/select.component'
import { FormToggleUI } from '../../../../components/forms/form-toggle/form-toggle.component'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import { Subtitle, Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import Counter from '../../components/counter/counter.component'
import DaySplitEditCard from '../../components/day-split-edit-card/day-split-edit-card.component'
import DaySplitEditFocusView from '../../components/day-split-edit-focus-view/day-split-edit-focus-view.component'
import DayTrainingSplitCard from '../../components/day-training-split-card/day-training-split-card.component'
import MakeActiveDialog from '../../components/dialog/make-active-dialog/make-active-dialog.component'
import MealPlanEditDialog from '../../components/edit-dialog/mealplan/mealplan-edit-dialog.component'
import WorkoutEditDialog from '../../components/edit-dialog/workoutday/workoutday-edit-dialog.component'
import { Styles } from './edit-split.styles'

interface EditTrainingSplitProps {
  data?: any
}
export default function EditTrainingSplit(props: EditTrainingSplitProps) {
  const { data } = props
  const [dayView, setDayView] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [count, setCount] = useState(data ? data.length : 0)

  const [editMealPlan, setEditMealPlan] = useState(false)
  const [editWorkout, setEditWorkout] = useState(false)

  const handleMealPlan = () => {
    setEditMealPlan(true)
  }

  const handleWorkout = () => {
    setEditWorkout(true)
  }

  return (
    <>
      <Styles>
        <Card className="AddTrainingSplit__card">
          <MobileBack
            alias={data ? 'training-split' : 'training-split-overview'}
            to={Routes.ACTIVITIES_TS + (data ? '/ts_1' : '')}
          />

          <div className="AddTrainingSplit__title-container">
            <Title>
              {data ? 'Editing Training Split' : 'Creating Training Split'}
            </Title>

            <Button onClick={() => setShowConfirm(true)}>
              {data ? 'Save Changes' : 'Create'}
            </Button>
          </div>

          <div className="AddTrainingSplit__divider" />

          <Subtitle className="AddTrainingSplit__subtitle">
            General Info
          </Subtitle>

          <div className="AddTrainingSplit__name-controls">
            <Input
              id="add-split-name"
              label="Name your training split"
              placeholder="Training Split Created 2021"
            />
          </div>

          <div className="AddTrainingSplit__info-controls">
            <Counter value={count} onChange={(value) => setCount(value)} />

            <DatePicker
              id="add-split-date"
              label="Start date"
              placeholder="Pick start date"
            />
            <DatePicker
              id="add-split-date"
              label="End date"
              placeholder="Pick end date"
            />
          </div>
        </Card>

        <Card className="AddTrainingSplit__card">
          <Subtitle className="AddTrainingSplit__link-title">
            Link your existing training plan and diet plan (Optional)
          </Subtitle>
          <p className="AddTrainingSplit__link-text">
            Any changes you make on your diet and training plans will be
            reflected in your training split and vice versa. Don’t want to link?
            No worries, we’ll create a new training and diet plan for you!
          </p>

          <div className="AddTrainingSplit__link-controls">
            <Select
              id="add-split-Diet-plan"
              label="Diet plan"
              placeholder="Select diet plan"
              options={[]}
            />
            <Select
              id="add-split-Training-plan"
              label="Training plan"
              placeholder="Select training plan"
              options={[]}
            />
          </div>
        </Card>

        <Card className="AddTrainingSplit__card">
          <div className="AddTrainingSplit__cards-title-container">
            <Subtitle className="AddTrainingSplit__cards-title">
              {data ? 'Edit your split' : 'Build your split'}
            </Subtitle>

            <div className="AddTrainingSplit__cards-toggle-container">
              <p className="AddTrainingSplit__cards-toggle-label">
                All Day View
              </p>
              <FormToggleUI
                className="AddTrainingSplit__cards-toggle"
                value={dayView}
                onUpdate={() => setDayView(!dayView)}
              />
              <p className="AddTrainingSplit__cards-toggle-label">
                Focused Day View
              </p>
            </div>
          </div>

          {dayView ? (
            <DaySplitEditFocusView />
          ) : (
            <>
              <div className="AddTrainingSplit__cards">
                {data &&
                  data.map((day: any) => (
                    <DayTrainingSplitCard
                      key={day.day}
                      data={day}
                      edit
                      onWorkout={handleWorkout}
                      onMealPlan={handleMealPlan}
                    />
                  ))}
                {!data && <DaySplitEditCard />}

                <div className="AddTrainingSplit__card-add">
                  <AddIcon />
                  Add More Days
                </div>
              </div>

              <div className="AddTrainingSplit__cards-checkbox-container">
                <Checkbox className="AddTrainingSplit__cards-checkbox" />
                <Label className="AddTrainingSplit__cards-checkbox-label">
                  Save as re-usable template
                </Label>
              </div>
            </>
          )}
        </Card>
      </Styles>
      <MakeActiveDialog
        actions={{
          yes: 'Looks good, save it',
          cancel: 'Cancel',
          onYes: () => setShowConfirm(false),
          onCancel: () => setShowConfirm(false),
          layout: 'between'
        }}
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        name="Make Change Training Split"
        description="You’re about to making changes to the following training split:"
        title="Training Split Created on Nov 01"
        date={{
          label:
            'Please select the date from when you want these changes to be applied:',
          value: ''
        }}
        alert={
          <>
            <div className="title">Read this before make change!</div>
            <ul>
              <li>
                A new revision of your training plan will be created. You can,
                at all times, go back to old revisions, such as the one you just
                edited, and re-activate it.
              </li>
              <li>
                Any changes you made to training and diet plans will be applied
                to respective meal/training plans. A new revision will be
                created.
              </li>
              <li>
                The version you just edited will become active and applied to
                any future dates on your calendar.
              </li>
            </ul>
          </>
        }
      />

      <WorkoutEditDialog
        open={editWorkout}
        onClose={() => setEditWorkout(false)}
        data={data ? data[0]?.workoutDay : undefined}
      />

      <MealPlanEditDialog
        open={editMealPlan}
        onClose={() => setEditMealPlan(false)}
        data={data ? data[0]?.mealPlanDay : undefined}
      />
    </>
  )
}
