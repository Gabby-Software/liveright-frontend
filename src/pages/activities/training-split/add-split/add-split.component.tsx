import { AddIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import GoBack from '../../../../components/buttons/go-back/go-back.component'
import Card from '../../../../components/cards/card/card.component'
import Checkbox from '../../../../components/form/checkbox/checkbox.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import Input from '../../../../components/form/input/input.component'
import Label from '../../../../components/form/label/label.component'
import Select from '../../../../components/form/select/select.component'
import { FormToggleUI } from '../../../../components/forms/form-toggle/form-toggle.component'
import { Subtitle, Title } from '../../../../components/typography'
import Counter from '../../components/counter/counter.component'
import DaySplitEditCard from '../../components/day-split-edit-card/day-split-edit-card.component'
import { Styles } from './add-split.styles'

export default function AddTrainingSplit() {
  return (
    <Styles>
      <Card className="AddTrainingSplit__card">
        <GoBack className="AddTrainingSplit__back">
          Back to Training Split Overview
        </GoBack>

        <div className="AddTrainingSplit__title-container">
          <Title>Creating Training Split</Title>

          <Button>Save</Button>
        </div>

        <div className="AddTrainingSplit__divider" />

        <Subtitle className="AddTrainingSplit__subtitle">General Info</Subtitle>

        <div className="AddTrainingSplit__name-controls">
          <Input
            id="add-split-name"
            label="Name your training split"
            placeholder="Training Split Created 2021"
          />
        </div>

        <div className="AddTrainingSplit__info-controls">
          <Counter />

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
          Any changes you make on your diet and training plans will be reflected
          in your training split and vice versa. Don’t want to link? No worries,
          we’ll create a new training and diet plan for you!
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
            Build your split
          </Subtitle>

          <div className="AddTrainingSplit__cards-toggle-container">
            <p className="AddTrainingSplit__cards-toggle-label">All Day View</p>
            <FormToggleUI
              className="AddTrainingSplit__cards-toggle"
              value={false}
              onUpdate={() => {}}
            />
            <p className="AddTrainingSplit__cards-toggle-label">
              Focused Day View
            </p>
          </div>
        </div>

        <div className="AddTrainingSplit__cards">
          <DaySplitEditCard />
          <DaySplitEditCard />

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
      </Card>
    </Styles>
  )
}
