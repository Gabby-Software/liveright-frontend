import { AddIcon, SearchIcon } from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import Input from '../../../../../../components/form/input/input.component'
import Select from '../../../../../../components/form/select/select.component'
import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import ItemAccordion from '../../../item-accordion/item-accordion.component'
import ExerciseAccordion from '../exercise-accordion/exercise-accordion.component'
import { WorkoutSubtitle } from '../workout/workout.styles'
import { Styles } from './workout-accordion.styles'

export default function WorkoutAccordion() {
  return (
    <ItemAccordion
      title="Workouts 1"
      content={
        <Styles>
          <div className="WorkoutAccordion__controls">
            <Input
              id="WorkoutAccordion__name-workout"
              label="Title of workout"
              placeholder="Workout one"
              suffix={<SearchIcon />}
              className="WorkoutAccordion__control"
            />
            <TimePicker
              id="WorkoutAccordion__time"
              label="Schedule"
              placeholder="08:00"
              className="WorkoutAccordion__control"
            />
            <Select
              id="WorkoutAccordion__days"
              options={[]}
              value={{ label: 'Apply to all days', value: 'Apply to all days' }}
            />
          </div>

          <WorkoutSubtitle>Exercises</WorkoutSubtitle>

          <div>
            <div>
              {[1, 2].map((row) => (
                <ExerciseAccordion key={row} />
              ))}
            </div>

            <div>
              <WorkoutSubtitle>Superset</WorkoutSubtitle>

              <div>
                {[1, 2].map((row) => (
                  <ExerciseAccordion key={row} />
                ))}
              </div>

              <WorkoutSubtitle>End superset</WorkoutSubtitle>
            </div>
          </div>

          <div className="WorkoutAccordion__actions">
            <Button
              variant="text"
              size="sm"
              className="WorkoutAccordion__action-btn"
            >
              <AddIcon />
              Add Exercise
            </Button>
            <Button
              variant="text"
              size="sm"
              className="WorkoutAccordion__action-btn"
            >
              <AddIcon />
              Add Superset
            </Button>
          </div>
        </Styles>
      }
    />
  )
}
