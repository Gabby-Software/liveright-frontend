import { useState } from 'react'

import {
  CaretDownIcon,
  DeleteOutlinedIcon
} from '../../../../../../assets/media/icons'
import { DragIcon } from '../../../../../../assets/media/icons/activities'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import Input from '../../../../../../components/form/input/input.component'
import Select from '../../../../../../components/form/select/select.component'
import { Styles } from './exercise-accordion.styles'

export default function ExerciseAccordion() {
  const [open, setOpen] = useState(false)
  return (
    <Styles $open={open}>
      <div className="ExerciseAccordion__summary">
        <div className="ExerciseAccordion__title-container">
          <button className="ExerciseAccordion__drag">
            <DragIcon />
          </button>

          <p className="ExerciseAccordion__title">Pushup</p>
        </div>

        <div className="ExerciseAccordion__actions">
          {open && (
            <IconButton size="sm" className="ExerciseAccordion__delete">
              <DeleteOutlinedIcon />
            </IconButton>
          )}
          <IconButton
            size="sm"
            className="ExerciseAccordion__caret"
            onClick={() => setOpen(!open)}
          >
            <CaretDownIcon />
          </IconButton>
        </div>
      </div>

      {open && (
        <div className="ExerciseAccordion__content">
          <Select
            id="ExerciseAccordion-name"
            options={[]}
            label="Exercise name"
            placeholder="Pushup"
            className="ExerciseAccordion__content-name"
          />

          <div className="ExerciseAccordion__content-controls">
            <Input id="ExerciseAccordion-sets" label="Sets" placeholder="-" />
            <Input id="ExerciseAccordion-reps" label="Reps" placeholder="-" />
            <Input id="ExerciseAccordion-tempo" label="Tempo" placeholder="-" />
            <Input
              id="ExerciseAccordion-Rest-Interval"
              label="Rest Interval"
              placeholder="-"
            />
          </div>

          <Input
            id="ExerciseAccordion-Link-to-video/instructions"
            label="Link to video/instructions"
            placeholder="-"
          />
        </div>
      )}
    </Styles>
  )
}
