import { DeleteOutlinedIcon } from '../../../../../../assets/media/icons'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
import Input from '../../../../../../components/form/input/input.component'
import Label from '../../../../../../components/form/label/label.component'
import Select from '../../../../../../components/form/select/select.component'
import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import Exercise from '../exercise/exercise.component'
import { Styles } from './workout.styles'

const EXERCISES = [
  { id: 1 },
  { id: 2 },
  { id: 3, type: 'superset', exercises: [{ id: 1 }, { id: 2 }] },
  { id: 4 },
  { id: 5 }
]

export default function Workout() {
  return (
    <Styles>
      <div className="Workout__header">
        <Input
          id="Workout-title"
          label="Title of workout"
          placeholder="Title"
        />

        <div className="Workout__header-checkbox-cell">
          <div className="Workout__header-checkbox-container">
            <Checkbox />
            <Label className="Workout__header-checkbox-label">
              Save workout as re-usable template
            </Label>
            <IconButton size="sm" className="Workout__header-checkbox-btn">
              <DeleteOutlinedIcon />
            </IconButton>
          </div>
        </div>

        <div className="Workout__header-schedule-container">
          <TimePicker id="Workout-time" label="Schedule" placeholder="08:00" />
          <Select
            id="Workout-days"
            options={[]}
            value={{ label: 'Apply to all days', value: 'Apply to all days' }}
          />
        </div>
      </div>

      <p className="Workout__subtitle">Exercises</p>

      <div>
        {EXERCISES.map((row) => {
          if (row.type === 'superset') {
            return (
              <div key={row.id}>
                <p className="Workout__subtitle">Superset</p>

                {row.exercises.map((r) => (
                  <Exercise key={r.id} />
                ))}

                <p className="Workout__subtitle">End superset</p>
              </div>
            )
          }
          return <Exercise key={row.id} />
        })}
      </div>
    </Styles>
  )
}
