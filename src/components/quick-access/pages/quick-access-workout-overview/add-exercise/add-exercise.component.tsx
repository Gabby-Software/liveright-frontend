import { FormikProvider, useFormik } from 'formik'
import { FC, useState } from 'react'

import { AddIcon, SearchIcon } from '../../../../../assets/media/icons'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import Button from '../../../../buttons/button/button.component'
import Input from '../../../../form/input/input.component'
import QuickAccessBack from '../../../components/quick-access-back/quick-access-back.component'
import { quickAccessRoutes } from '../../../quick-access.routes'
import Styles from './add-exercise.styles'

const WorkoutOverviewAddExercise: FC = () => {
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      exercise: '',
      sets: '',
      reps: '',
      tempo: '',
      restInterval: ''
    },
    // validationSchema: formValidations,
    onSubmit: (values) => {
      console.log(values)
      alert(JSON.stringify(values, null, 2))
    }
  })

  const [mode, setMode] = useState<'exercise' | 'superset'>('exercise')

  return (
    <Styles mode={mode}>
      <QuickAccessBack
        label={'overview'}
        route={quickAccessRoutes.WORKOUT_OVERVIEW}
      />

      <div className="qa-workout-overview-add-exercise__header">
        <h2>
          {t(`quickaccess:workout-overview.add-exercise.heading-${mode}`)}
        </h2>
        <Button
          variant="text"
          onClick={() => setMode(mode === 'exercise' ? 'superset' : 'exercise')}
        >
          {t(
            `quickaccess:workout-overview.add-exercise.switch-mode-${
              mode === 'exercise' ? 'superset' : 'exercise'
            }`
          )}
        </Button>
      </div>

      {mode === 'superset' && (
        <div className="qa-workout-overview-add-exercise__superset-heading">
          <h4>Superset 1</h4>
          <hr className="qa-workout-overview-add-exercise__divider" />
        </div>
      )}

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="qa-workout-overview-add-exercise__form-container">
            <Input
              className="qa-workout-overview-add-exercise__exercise"
              id="qa-workout-overview-add-exercise-exercise"
              label={t(
                'quickaccess:workout-overview.add-exercise.label-exercises'
              )}
              name="exercises"
              placeholder={t(
                'quickaccess:workout-overview.add-exercise.placeholder-exercises'
              )}
              value={formik.values.exercise}
              suffix={<SearchIcon />}
              onChange={(e) => formik.setFieldValue('exercise', e.target.value)}
            />

            <div className="qa-workout-overview-add-exercise__input-group">
              <>
                <Input
                  className="qa-workout-overview-add-exercise__input-group-item"
                  id="qa-workout-overview-add-exercise-sets"
                  label={t(
                    'quickaccess:workout-overview.add-exercise.label-sets'
                  )}
                  name="sets"
                  value={formik.values.sets}
                  placeholder="-"
                  onChange={(e) =>
                    !isNaN(+e.target.value) &&
                    formik.setFieldValue('sets', e.target.value)
                  }
                />
                <Input
                  className="qa-workout-overview-add-exercise__input-group-item"
                  id="qa-workout-overview-add-exercise-reps"
                  label={t(
                    'quickaccess:workout-overview.add-exercise.label-reps'
                  )}
                  name="reps"
                  value={formik.values.reps}
                  placeholder="-"
                  onChange={(e) =>
                    !isNaN(+e.target.value) &&
                    formik.setFieldValue('reps', e.target.value)
                  }
                />
                <Input
                  className="qa-workout-overview-add-exercise__input-group-item"
                  id="qa-workout-overview-add-exercise-tempo"
                  label={t(
                    'quickaccess:workout-overview.add-exercise.label-tempo'
                  )}
                  name="tempo"
                  value={formik.values.tempo}
                  placeholder="-"
                  onChange={(e) =>
                    !isNaN(+e.target.value) &&
                    formik.setFieldValue('tempo', e.target.value)
                  }
                />
                <Input
                  className="qa-workout-overview-add-exercise__input-group-item"
                  id="qa-workout-overview-add-exercise-rest-interval"
                  label={t(
                    'quickaccess:workout-overview.add-exercise.label-rest'
                  )}
                  name="rest-interval"
                  value={formik.values.restInterval}
                  placeholder="-"
                  onChange={(e) =>
                    !isNaN(+e.target.value) &&
                    formik.setFieldValue('restInterval', e.target.value)
                  }
                />
              </>
            </div>
          </div>

          {mode === 'superset' && (
            <Button
              variant="text"
              className="qa-workout-overview-add-exercise__add-superset-exercise-btn"
            >
              <AddIcon />{' '}
              <span>{t('quickaccess:workout-overview.add-exercise-btn')}</span>
            </Button>
          )}

          <Button className="qa-workout-overview-add-exercise__button">
            {t(`quickaccess:workout-overview.add-exercise.add-${mode}-btn`)}
          </Button>
        </form>
      </FormikProvider>
    </Styles>
  )
}

export default WorkoutOverviewAddExercise
