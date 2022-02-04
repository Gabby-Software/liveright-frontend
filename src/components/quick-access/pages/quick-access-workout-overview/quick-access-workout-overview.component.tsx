import moment from 'moment'
import React, { FC, useState } from 'react'

import {
  AddIcon,
  OptionSolidIcon,
  VideoOutlinedIcon
} from '../../../../assets/media/icons'
import VideoImg from '../../../../assets/media/quick-access-video.png'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import Button from '../../../buttons/button/button.component'
import Card from '../../../card/card.style'
import QuickAccessBack from '../../components/quick-access-back/quick-access-back.component'
import QuickAccessModal from '../../components/quick-access-modal/quick-access-modal.component'
import QuickAccessTopbar from '../../components/quick-access-topbar/quick-access-topbar.component'
import { useQuickAccess } from '../../quick-access.context'
import { quickAccessRoutes } from '../../quick-access.routes'
import Styles from './quick-access-workout-overview.styles'

interface Props {}

const QuickAccessWorkoutOverview: FC<Props> = () => {
  const { t } = useTranslation()
  const { routeParams, workoutsData, setRoute } = useQuickAccess()
  const workout = workoutsData.find((workout) => workout.id === routeParams.id)

  const [showVideo, setShowVideo] = useState(false)

  const renderExercise = (exercise: any, fromSuperset?: boolean) => {
    return (
      <Card
        className={`exercise-card ${fromSuperset ? 'superset-exercise' : ''}`}
        key={exercise.id}
      >
        <div>
          <h3>{exercise.name}</h3>
          <h4>
            {exercise.type === 'strength'
              ? `${exercise.sets} sets, ${exercise.reps} reps`
              : `${exercise.intensity} intensity`}
          </h4>
          <span className="video-link" onClick={() => setShowVideo(true)}>
            <VideoOutlinedIcon />
            <span>{t('quickaccess:workout-overview.view-video')}</span>
          </span>
        </div>
        <div className="exercise-data">
          {exercise.type === 'strength' ? (
            <>
              <div className="exercise-data-card">
                <h3>{exercise.rest}</h3>
                <h4>{t('quickaccess:workout-overview.rest')}</h4>
              </div>
              <div className="exercise-data-card">
                <h3>{exercise.tempo}</h3>
                <h4>{t('quickaccess:workout-overview.tempo')}</h4>
              </div>
            </>
          ) : (
            <div className="exercise-data-card">
              <h3>{exercise.time}</h3>
              <h4>{t('quickaccess:workout-overview.time')}</h4>
            </div>
          )}
        </div>
      </Card>
    )
  }

  const renderSuperset = (superset: any) => {
    return (
      <Card className="superset-card" key={superset.id}>
        <h3 className="superset-card-header">{superset.name}</h3>

        {superset.exercises.map((exercise: any) =>
          renderExercise(exercise, true)
        )}
      </Card>
    )
  }

  return (
    <Styles>
      <QuickAccessTopbar />
      <QuickAccessBack
        label="log-exercise"
        route={quickAccessRoutes.LOG_EXERCISE}
        color={getColorCarry('neutral_50')}
      />
      <div className="header">
        <h2>{routeParams?.name}</h2>
        <OptionSolidIcon />
      </div>
      <h4>{moment().format('dddd, D MMMM YYYY').toString()}</h4>

      <div className="body">
        {workout.exercises.map((exercise: any) =>
          exercise.type === 'superset'
            ? renderSuperset(exercise)
            : renderExercise(exercise)
        )}
      </div>

      <div className="footer">
        <button
          className="add-exercise-button"
          onClick={() =>
            setRoute(quickAccessRoutes.WORKOUT_OVERVIEW_ADD_EXERCISE)
          }
        >
          <AddIcon />{' '}
          <span>{t('quickaccess:workout-overview.add-exercise-btn')}</span>
        </button>

        <div className="button-group">
          <Button className="button-group__button" variant="secondary">
            {t('quickaccess:workout-overview.mark-completed')}
          </Button>
          <Button
            className="button-group__button"
            onClick={() =>
              setRoute(quickAccessRoutes.WORKOUT_LOGGING_STRENGTH, {
                id: routeParams.id,
                name: routeParams.name
              })
            }
          >
            {t('quickaccess:workout-overview.start-workout')}
          </Button>
        </div>
      </div>

      <QuickAccessModal
        visible={showVideo}
        onCancel={() => setShowVideo(false)}
      >
        <img
          src={VideoImg}
          alt="workout-video"
          style={{ marginTop: '35px', width: '100%' }}
        />
      </QuickAccessModal>
    </Styles>
  )
}

export default QuickAccessWorkoutOverview
