import { FormikProvider, useFormik } from 'formik'
import moment from 'moment'
import { FC, useState } from 'react'

import { SearchIcon } from '../../../../assets/media/icons'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import Button from '../../../buttons/button/button.component'
import DatePicker from '../../../form/date-picker/date-picker.component'
import Input from '../../../form/input/input.component'
import RadioInput from '../../../form/radio-input/radio-input.component'
import Select from '../../../form/select/select.component'
import TimePicker from '../../../form/time-picker/time-picker.component'
import QuickAccessBack from '../../components/quick-access-back/quick-access-back.component'
import { quickAccessRoutes } from '../../quick-access.routes'
import Styles from './quick-access-add-exercise.styles'

const intensityOptions = [
  {
    label: 'Low',
    value: 'low'
  },
  {
    label: 'Moderate',
    value: 'moderate'
  },
  {
    label: 'High',
    value: 'high'
  }
]

const QuickAccessAddExercise: FC = () => {
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      date: '',
      exercise: '',
      sets: '',
      reps: '',
      tempo: '',
      restInterval: '',
      time: '',
      intensity: ''
    },
    // validationSchema: formValidations,
    onSubmit: (values) => {
      console.log(values)
      alert(JSON.stringify(values, null, 2))
    }
  })

  const [exerciseType, setExerciseType] = useState('strength')

  return (
    <Styles>
      <QuickAccessBack label={'add'} route={quickAccessRoutes.ADD} />

      <div className="qa-add-exercise__radio-group">
        <RadioInput
          name="exercise-type"
          label={t('quickaccess:add-exercise.label-strength')}
          value="strength"
          isChecked={exerciseType === 'strength'}
          handleChange={(value) => setExerciseType(value)}
        />
        <RadioInput
          name="exercise-type"
          label={t('quickaccess:add-exercise.label-cardio')}
          value="cardio"
          isChecked={exerciseType === 'cardio'}
          handleChange={(value) => setExerciseType(value)}
        />
      </div>

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <DatePicker
            className="qa-add-exercise__date"
            id="qa-add-exercise-date"
            defaultPickerValue={moment()}
            defaultValue={moment('2015-01-01', 'YYYY-MM-DD')}
            allowClear={false}
            label={t('quickaccess:add-exercise.label-date')}
            value={formik.values.date}
            onChange={(value, dateStr) => formik.setFieldValue('date', dateStr)}
          />
          <Input
            className="qa-add-exercise__exercise"
            id="qa-add-exercise-exercise"
            label={t('quickaccess:add-exercise.label-exercises')}
            name="exercises"
            placeholder={t('quickaccess:add-exercise.placeholder-exercises')}
            value={formik.values.exercise}
            suffix={<SearchIcon />}
            onChange={(e) => formik.setFieldValue('exercise', e.target.value)}
          />

          <div className="qa-add-exercise__input-group">
            {exerciseType === 'strength' ? (
              <>
                <Input
                  className="qa-add-exercise__input-group-item"
                  id="qa-add-exercise-sets"
                  label={t('quickaccess:add-exercise.label-sets')}
                  name="sets"
                  value={formik.values.sets}
                  placeholder="-"
                  onChange={(e) =>
                    !isNaN(+e.target.value) &&
                    formik.setFieldValue('sets', e.target.value)
                  }
                />
                <Input
                  className="qa-add-exercise__input-group-item"
                  id="qa-add-exercise-reps"
                  label={t('quickaccess:add-exercise.label-reps')}
                  name="reps"
                  value={formik.values.reps}
                  placeholder="-"
                  onChange={(e) =>
                    !isNaN(+e.target.value) &&
                    formik.setFieldValue('reps', e.target.value)
                  }
                />
                <Input
                  className="qa-add-exercise__input-group-item"
                  id="qa-add-exercise-tempo"
                  label={t('quickaccess:add-exercise.label-tempo')}
                  name="tempo"
                  value={formik.values.tempo}
                  placeholder="-"
                  onChange={(e) =>
                    !isNaN(+e.target.value) &&
                    formik.setFieldValue('tempo', e.target.value)
                  }
                />
                <Input
                  className="qa-add-exercise__input-group-item"
                  id="qa-add-exercise-rest-interval"
                  label={t('quickaccess:add-exercise.label-rest')}
                  name="rest-interval"
                  value={formik.values.restInterval}
                  placeholder="-"
                  onChange={(e) =>
                    !isNaN(+e.target.value) &&
                    formik.setFieldValue('restInterval', e.target.value)
                  }
                />
              </>
            ) : (
              <>
                <TimePicker
                  className="qa-add-exercise__input-group-item"
                  id="qa-add-exercise-time"
                  label={t('quickaccess:add-exercise.label-time')}
                  name="time"
                  value={formik.values.time}
                  placeholder="-"
                  format="mm:ss"
                  allowClear={false}
                  onChange={(value, dateStr) =>
                    formik.setFieldValue('time', dateStr)
                  }
                />
                <Select
                  className="qa-add-exercise__input-group-item"
                  id="qa-add-exercise-intensity"
                  label={t('quickaccess:add-exercise.label-intensity')}
                  name="intensity"
                  value={formik.values.intensity}
                  placeholder="-"
                  options={intensityOptions}
                  onChange={(value) => formik.setFieldValue('intensity', value)}
                />
              </>
            )}

            <div className="qa-add-exercise__button-group">
              <Button variant="secondary" className="qa-add-exercise__button">
                {t('quickaccess:add-exercise.add-exercise')}
              </Button>
              <Button className="qa-add-exercise__button">
                {t('quickaccess:add-exercise.add-log-exercise')}
              </Button>
            </div>
          </div>
        </form>
      </FormikProvider>
    </Styles>
  )
}

export default QuickAccessAddExercise
