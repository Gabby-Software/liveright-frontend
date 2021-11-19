import { useState } from 'react'

import { CaretDownIcon } from '../../../../assets/media/icons'
import { FoodIcon } from '../../../../assets/media/icons/activities'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Input from '../../../../components/form/input/input.component'
import Workout from './components/workout/workout.component'
import { Styles } from './workout-day-accordion.styles'

const WORKOUTS = [{ id: 1 }, { id: 2 }]

export default function WorkoutDayAccordion() {
  const [open, setOpen] = useState(false)
  return (
    <Styles $open={open}>
      <div className="WorkoutDayAccordion__summary">
        <div className="WorkoutDayAccordion__summary-title-container">
          <div className="WorkoutDayAccordion__summary-icon">
            <FoodIcon />
          </div>

          <p className="WorkoutDayAccordion__summary-title">
            High Intensity Workouts
          </p>
        </div>

        <IconButton
          className="WorkoutDayAccordion__summary-btn"
          onClick={() => setOpen(!open)}
        >
          <CaretDownIcon />
        </IconButton>
      </div>

      {open && (
        <div className="WorkoutDayAccordion__content">
          <Input
            id="WorkoutDayAccordion-name"
            label="Workout Day Name"
            placeholder="Name"
            className="WorkoutDayAccordion__content-name-input"
          />

          <div className="">
            <p className="WorkoutDayAccordion__content-subtitle">
              List workouts of this training plan
            </p>

            {WORKOUTS.map((row) => (
              <Workout key={row.id} />
            ))}
          </div>
        </div>
      )}
    </Styles>
  )
}
