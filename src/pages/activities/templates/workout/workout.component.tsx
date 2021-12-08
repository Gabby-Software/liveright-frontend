import React, { useState } from 'react'

import { DeleteOutlinedIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import RadioGroup from '../../../../components/form/radio-group/radio-group.component'
import Select, {
  SelectProps
} from '../../../../components/form/select/select.component'
import { Option } from '../../../../components/form/select/select.options'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import { Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import WorkoutTemplateDialog from '../../components/dialog/workout-template-dialog/workout-template-dialog.component'
import ActivityLayout from '../../components/layout/layout.component'
import { Styles } from '../../styles/plan.styles'
import { GeneralTable } from '../components/general-table/general-table.component'

const labels = [
  'Excercise',
  'Sets',
  'Reps',
  'Tempo',
  'Rest Interval',
  'Video Link'
]
const keys = ['name', 'sets', 'reps', 'tempo', 'rest', 'video']
const links = ['video']
const data = [
  {
    name: 'Squats',
    sets: 1,
    reps: 2,
    tempo: 3,
    rest: '5 min',
    video: ''
  },
  {
    name: 'Pushup',
    sets: 3,
    reps: 2,
    tempo: 3,
    rest: '3 min',
    video: ''
  }
]

export default function Workout() {
  const [showConfirm, setShowConfirm] = useState(false)
  const [option, setOption] = useState('existing')
  const [tpOption, setTpOption] = useState('123')
  const [dwOption, setDwOption] = useState('123')
  const onDelete = () => {}

  const tpOptions = [
    { label: 'Lose Weight', value: '123' },
    { label: 'Wonder', value: '124' }
  ]
  const dwOptions = [
    { label: 'High Intensity Training', value: '123' },
    { label: 'Low Intensity Training', value: '124' }
  ]
  return (
    <ActivityLayout>
      <Styles>
        <section className="topbar">
          <MobileBack
            to={Routes.ACTIVITIES_TM}
            alias="templates"
            className="topbar-back"
          />

          <Button variant="text" onClick={onDelete} className="topbar-delete">
            <DeleteOutlinedIcon style={{ marginRight: 8 }} />
            Delete Template
          </Button>
        </section>

        <Card className="PlanPage__card">
          <div className="PlanPage__header">
            <Title>High Intensity Workout</Title>

            <div className="PlanPage__header-actions">
              <Button variant="dark" className="PlanPage__header-btn">
                Edit Workout Template
              </Button>
              <Button
                className="PlanPage__header-btn"
                onClick={() => setShowConfirm(true)}
              >
                Use Workout Template
              </Button>
            </div>
          </div>

          <div className="PlanPage__divider" />

          <div className="PlanPage__content">
            <GeneralTable
              labels={labels}
              keys={keys}
              links={links}
              data={data}
            />
          </div>
        </Card>
      </Styles>

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
                    value: 'new ',
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
    </ActivityLayout>
  )
}
