import { Controller, useForm } from 'react-hook-form'
import { mutate } from 'swr'

import Button from '../../../../components/buttons/button/button.component'
import Drawer from '../../../../components/drawer/drawer.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import Input from '../../../../components/form/input/input.component'
import Textarea from '../../../../components/form/textarea/textarea.component'
import TimePicker from '../../../../components/form/time-picker/time-picker.component'
import { EP_CALENDAR } from '../../../../enums/api.enum'
import useEvent from '../../../../hooks/api/calendar/useEvent'
import { Styles } from './add-event.styles'

interface ContentProps {
  onClose: () => void
}

function Content({ onClose }: ContentProps) {
  const form = useForm()
  const { onAdd } = useEvent()

  const handleSuccess = () => {
    mutate(EP_CALENDAR + '?per_page=9999')
    onClose()
  }

  const handleSave = (values: any) => {
    onAdd(values, handleSuccess)
  }

  return (
    <Styles>
      <Controller
        control={form.control}
        render={({ field: { value, name } }) => {
          return (
            <Input
              id="add-event-name"
              label="Name"
              placeholder="Event name"
              className="add-event__control"
              value={value}
              onChange={(e) => form.setValue(name, e.target.value)}
            />
          )
        }}
        name="name"
      />

      <div className="add-event__date-container">
        <Controller
          control={form.control}
          render={({ field: { name, value } }) => (
            <DatePicker
              id="add-event-date"
              label="Date"
              placeholder="01/09/2021"
              value={value}
              onChange={(e, date) => form.setValue(name, date)}
            />
          )}
          name="date"
        />
        <Controller
          control={form.control}
          render={({ field: { name, value } }) => (
            <TimePicker
              id="add-event-time"
              label="Time"
              placeholder="12:30"
              value={value}
              format="HH:mm:ss"
              onChange={(e, date) => form.setValue(name, date)}
            />
          )}
          name="time"
        />
      </div>

      <Controller
        control={form.control}
        render={({ field: { name, value } }) => (
          <Textarea
            id="add-event-desc"
            label="Description"
            placeholder="Type here"
            className="add-event__control"
            value={value}
            onChange={(e) => form.setValue(name, e.target.value)}
          />
        )}
        name="description"
      />

      <Button onClick={() => form.handleSubmit(handleSave)()}>Save</Button>
    </Styles>
  )
}

interface AddEventProps extends ContentProps {
  open: boolean
}

export default function AddEvent({ open, onClose }: AddEventProps) {
  return (
    <Drawer
      title="Add New Event"
      onClose={onClose}
      open={open}
      width={520}
      destroyOnClose
    >
      <Content onClose={onClose} />
    </Drawer>
  )
}
