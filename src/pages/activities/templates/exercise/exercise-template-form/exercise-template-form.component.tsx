import { yupResolver } from '@hookform/resolvers/yup'
import { get } from 'lodash'
import { useEffect } from 'react'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { useParams } from 'react-router'
import * as yup from 'yup'

import { ExerciseIcon } from '../../../../../assets/media/icons/activities'
import Button from '../../../../../components/buttons/button/button.component'
import GoBack from '../../../../../components/buttons/go-back/go-back.component'
import Input from '../../../../../components/form/input/input.component'
import Select from '../../../../../components/form/select/select.component'
import TimePicker from '../../../../../components/form/time-picker/time-picker.component'
import useTemplateExercise from '../../../../../hooks/api/templates/useTemplateExercise'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import HeaderLink from '../../../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../../../layouts/mobile-page/mobile-page.component'
import formatter from '../../../../../managers/formatter.manager'
import Styles, {
  ExerciseFormStyles,
  ExerciseStyles
} from './exercise-template-form.styles'

interface IProps {
  isCardio: boolean
  onClose: () => void
}

const defaultValues = {
  name: '',
  info: {}
}

const validationSchema = yup.object().shape({
  name: yup.string(),
  info: yup.object().shape({})
})

export default function ExerciseTemplateForm({ isCardio, onClose }: IProps) {
  const isMobile = useIsMobile()

  const methods = useForm<any>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
    mode: 'onChange'
  })

  const onChange = (name: string, value: string | boolean) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const exerciseName = useWatch({
    name: `name`,
    control: methods.control
  })

  const { id } = useParams<any>()
  const { exercise, onEdit } = useTemplateExercise(id)

  useEffect(() => {
    if (exercise._id) {
      methods.setValue('name', exercise.name)
      if (exercise?.info?.cardio) {
        methods.setValue(`info.cardio`, true)
        methods.setValue(`info.duration`, exercise.info.duration)
        methods.setValue(`info.intensity`, exercise.info.intensity)
        methods.unregister()
      } else {
        methods.setValue(`info.sets`, exercise.info.sets)
        methods.setValue(`info.reps`, exercise.info.reps)
        methods.setValue(`info.tempo`, exercise.info.tempo)
        methods.setValue(`info.rest_interval`, exercise.info.rest_interval)
        methods.setValue(`link`, exercise.link)
      }
    }
  }, [exercise._id])

  const { errors } = methods.formState

  const handleSave = () => {
    methods.handleSubmit((values) => onEdit(id, values, () => onClose()))()
  }

  const renderExerciseNameField = (name: string, value: string) => {
    return (
      <Input
        id="Exercise-name"
        label={`${isCardio ? 'Cardio' : 'Exercise'} Name`}
        placeholder={isCardio ? 'Cardio' : 'Exercise'}
        value={value}
        onChange={(e) => {
          onChange(name, e.target.value)
        }}
        error={get(errors, name)}
        ErrorProps={{ size: 'sm' }}
      />
    )
  }

  const content = (
    <FormProvider {...methods}>
      <ExerciseStyles>
        <div className="Exercise__header">
          <div className="Exercise__header-title">
            <div className="Exercise__header-icon">
              <ExerciseIcon />
            </div>
            <div className="subtitle">
              {exerciseName || exercise.name || 'Exercise'}
            </div>
          </div>

          <div className="Exercise__header-checkbox-cell">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>

        <ExerciseFormStyles cardio={isCardio}>
          <Controller
            name={`name`}
            render={({ field: { name, value } }) =>
              renderExerciseNameField(name, value)
            }
          />
          {isCardio ? (
            <>
              <Controller
                name={`info.duration`}
                render={({ field: { name, value } }) => (
                  <TimePicker
                    id="cardio-duration"
                    label="Duration"
                    placeholder="00:30"
                    value={value}
                    onChange={(e, date) => {
                      methods.setValue(name, date)
                    }}
                    error={get(errors, name)}
                  />
                )}
              />

              <Controller
                name={`info.intensity`}
                render={({ field: { value, name } }) => (
                  <Select
                    label="Intensity"
                    id="cardio-intensity"
                    value={value}
                    onChange={(value) => methods.setValue(name, value)}
                    options={[
                      { label: 'Relaxed', value: 'Relaxed' },
                      { label: 'Moderate', value: 'Moderate' },
                      { label: 'Intense', value: 'Intense' }
                    ]}
                  />
                )}
              />
            </>
          ) : (
            <>
              <Controller
                name={`info.sets`}
                render={({ field: { name, value } }) => (
                  <Input
                    id="Exercise-sets"
                    label="Sets"
                    placeholder="10"
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    format={formatter().number().min(0).max(100)}
                    error={get(errors, name)}
                    ErrorProps={{ size: 'sm' }}
                  />
                )}
              />
              <Controller
                name={`info.reps`}
                render={({ field: { name, value } }) => (
                  <Input
                    id="Exercise-reps"
                    label="Reps"
                    placeholder="10"
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    format={formatter().number().min(0).max(100)}
                    error={get(errors, name)}
                    ErrorProps={{ size: 'sm' }}
                  />
                )}
              />
              <Controller
                name={`info.tempo`}
                render={({ field: { name, value } }) => (
                  <Input
                    id="Exercise-tempo"
                    label="Tempo"
                    placeholder="3x21"
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    tooltip="Only 4 digits or x allowed."
                    error={get(errors, name)}
                    ErrorProps={{ size: 'sm' }}
                  />
                )}
              />
              <Controller
                name={`info.rest_interval`}
                render={({ field: { name, value } }) => (
                  <Input
                    id="Exercise-rest-interval"
                    label="Rest Interval"
                    placeholder="10"
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    format={formatter().number().min(0).max(100)}
                    error={get(errors, name)}
                    ErrorProps={{ size: 'sm' }}
                  />
                )}
              />
              <Controller
                name={`link`}
                render={({ field: { name, value } }) => (
                  <Input
                    id="Exercise-link"
                    label="Link to video/instructions"
                    placeholder="https://"
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    error={get(errors, name)}
                    ErrorProps={{ size: 'sm' }}
                  />
                )}
              />
            </>
          )}
        </ExerciseFormStyles>
      </ExerciseStyles>
    </FormProvider>
  )

  return isMobile ? (
    <MobilePage
      title="Editing Exercise Template"
      headerTopComponent={
        <HeaderLink onClick={onClose}>Go Back to Overview</HeaderLink>
      }
    >
      <Styles>{content}</Styles>
    </MobilePage>
  ) : (
    <Styles>
      <GoBack onClick={onClose}>{'Go Back to Overview'}</GoBack>
      <h1 className="Title">Edit Exercise Template</h1>
      {content}
    </Styles>
  )
}
