import React, { useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router'

import { DeleteOutlinedIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Dialog from '../../../../components/dialogs/dialog/dialog.component'
import RadioGroup from '../../../../components/form/radio-group/radio-group.component'
import Select from '../../../../components/form/select/select.component'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import { Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import useTemplateWorkout from '../../../../hooks/api/templates/workouts/useTemplateWorkout'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import WorkoutTemplateDialog from '../../components/dialog/workout-template-dialog/workout-template-dialog.component'
import TemplateLayout from '../../components/layout/layout.component'
import ExerciseMobileCards from '../../components/split-day-workout-card/workout-mobile-card/workout-mobile-card'
import { Styles } from '../../styles/plan.styles'
import { GeneralTable } from '../components/general-table/general-table.component'
import TemplateMobilePage from '../components/template-mobile-page/template-mobile-page.component'
import WorkoutTemplateForm from './workout-template-form/workout-template-form.component'

const labels = [
  'Excercise',
  'Sets',
  'Reps',
  'Tempo',
  'Rest Interval',
  'Video Link'
]
const keys = ['name', 'sets', 'reps', 'tempo', 'rest_interval', 'video']
const links = ['video']

const tpOptions = [
  { label: 'Lose Weight', value: '123' },
  { label: 'Wonder', value: '124' }
]
const dwOptions = [
  { label: 'High Intensity Training', value: '123' },
  { label: 'Low Intensity Training', value: '124' }
]

export default function Workout() {
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [edit, setEdit] = useState(false)
  const [option, setOption] = useState('existing')
  const [tpOption, setTpOption] = useState('123')
  const [dwOption, setDwOption] = useState('123')

  const isMobile = useIsMobile()
  const history = useHistory()
  const params = useParams<any>()
  const { workout, onDelete } = useTemplateWorkout(params.id)

  const detail = useMemo(() => {
    const rows = workout.items
      ? workout.items
          .map((item) => {
            const exercises = item.is_superset ? item.data : [item.data]
            return exercises.map((a: any) => ({
              name: a?.name,
              sets: a?.info?.sets,
              reps: a?.info?.reps,
              tempo: a?.info?.tempo,
              rest_interval: a?.info?.rest_interval,
              video: a?.link
            }))
          })
          .reduce((m, n) => [...m, ...n])
      : []
    return rows
  }, [workout, params])

  if (edit) {
    return <WorkoutTemplateForm onClose={() => setEdit(false)} />
  }

  const content = (
    <>
      <section className="PlanPage__content">
        <div className="table">
          {isMobile ? (
            <ExerciseMobileCards data={workout} />
          ) : (
            <GeneralTable
              labels={labels}
              keys={keys}
              links={links}
              data={detail}
            />
          )}
        </div>
      </section>

      <WorkoutTemplateDialog
        name="Use workout template"
        title="High Intensity Workout"
        description="You’re about to use the following workout template"
        body={
          <div style={{ marginBottom: '1.5rem' }}>
            <div className="options-todo">
              <p>What do you wish to do?</p>
              <RadioGroup
                align="vertical"
                options={[
                  {
                    label: 'Add to existing training plan day',
                    value: 'existing',
                    disabled: false
                  },
                  {
                    label: 'Create new training plan day from this workout',
                    value: 'new',
                    disabled: false
                  }
                ]}
                value={option}
                onChange={(e) => setOption(e.target.value)}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1.5rem'
              }}
            >
              <div style={{ width: '45%' }}>
                <p>Select training plan</p>
                <Select
                  id="training-plan-select"
                  options={tpOptions}
                  value={tpOption}
                  onChange={(value) => setTpOption(value)}
                />
              </div>
              <div style={{ width: '45%' }}>
                <p>Select day workout</p>
                <Select
                  id="day-workout-select"
                  options={dwOptions}
                  value={dwOption}
                  onChange={(value) => setDwOption(value)}
                />
              </div>
            </div>
          </div>
        }
        date={{
          label: 'From when should we apply this change',
          value: ''
        }}
        alert="This will make changes to John Travolta’s “Lose Weight” training plan, which is currently active and will add this workout to the “High Intensity Day”. You can make changes to the order of exercises and details after confirming below. This will take effect immediately."
        yes="Confirm Changes"
        cancel="Nevermind"
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
      />
      <Dialog
        open={confirmDelete}
        title="Delete Workout template"
        onClose={() => setConfirmDelete(false)}
      >
        <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          Are you sure you want to delete the template? You will not be able to
          recover it later!
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <Button
            onClick={() => {
              onDelete(params.id, () => {
                history.push(Routes.ACTIVITIES_TM)
              })
            }}
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
        </div>
      </Dialog>
    </>
  )

  return !isMobile ? (
    <TemplateLayout>
      <Styles>
        <section className="topbar">
          <MobileBack
            to={Routes.ACTIVITIES_TM}
            alias="templates"
            className="topbar-back"
          />

          <Button
            variant="text"
            onClick={() => setConfirmDelete(true)}
            className="topbar-delete"
          >
            <DeleteOutlinedIcon style={{ marginRight: 8 }} />
            Delete Template
          </Button>
        </section>

        <Card className="PlanPage__card">
          <section className="PlanPage__header">
            <Title>{workout.name}</Title>

            <div className="PlanPage__header-actions">
              <Button
                variant="dark"
                className="PlanPage__header-btn"
                onClick={() => setEdit(true)}
              >
                Edit Workout Template
              </Button>
              <Button
                className="PlanPage__header-btn"
                onClick={() => setShowConfirm(true)}
              >
                Use Workout Template
              </Button>
            </div>
          </section>

          <section className="PlanPage__divider" />

          {content}
        </Card>
      </Styles>
    </TemplateLayout>
  ) : (
    <TemplateMobilePage
      contentTitle={workout.name}
      pageTitle={'Workout Detail'}
      actionComponent={
        <Button
          className="PlanPage__header-btn"
          onClick={() => setShowConfirm(true)}
        >
          Use Template
        </Button>
      }
      onDelete={() => setConfirmDelete(true)}
      onEdit={() => setEdit(true)}
    >
      {content}
    </TemplateMobilePage>
  )
}
