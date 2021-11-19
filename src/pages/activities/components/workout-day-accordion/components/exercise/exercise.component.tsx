import { DeleteOutlinedIcon } from '../../../../../../assets/media/icons'
import { DragIcon } from '../../../../../../assets/media/icons/activities'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import Input from '../../../../../../components/form/input/input.component'
import Select from '../../../../../../components/form/select/select.component'
import { Styles } from './exercise.styles'

export default function Exercise() {
  return (
    <Styles>
      <div className="Exercise__drag">
        <button className="Exercise__drag-btn">
          <DragIcon />
        </button>
      </div>

      <Select
        id="Exercise-name"
        label="Exercise name"
        placeholder="1A--"
        options={[]}
      />
      <Input id="Exercise-steps" label="Steps" placeholder="10" />
      <Input id="Exercise-reps" label="Reps" placeholder="10" />
      <Input id="Exercise-tempo" label="Tempo" placeholder="10" />
      <Input
        id="Exercise-rest-interval"
        label="Rest Interval"
        placeholder="10"
      />
      <Input
        id="Exercise-link"
        label="Link to video/instructions"
        placeholder="https://"
      />

      <div className="Exercise__delete">
        <IconButton className="Exercise__delete-btn">
          <DeleteOutlinedIcon />
        </IconButton>
      </div>
    </Styles>
  )
}
