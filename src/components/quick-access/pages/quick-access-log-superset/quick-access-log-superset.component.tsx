import React, { FC, useState } from 'react'

import { VideoOutlinedIcon } from '../../../../assets/media/icons'
import VideoImg from '../../../../assets/media/quick-access-video.png'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import Button from '../../../buttons/button/button.component'
import Card from '../../../card/card.style'
import QuickAccessModal from '../../components/quick-access-modal/quick-access-modal.component'
import ProggressBar from '../../components/quick-access-progress-bar/quick-access-progress-bar.component'
import { useQuickAccess } from '../../quick-access.context'
import { quickAccessRoutes } from '../../quick-access.routes'
import Styles from './quick-access-log-superset.styles'

const superset = {
  id: 2,
  name: 'Superset A',
  type: 'superset',
  exercises: [
    {
      id: 21,
      name: 'Pushups',
      type: 'strength',
      sets: 4,
      reps: 4,
      rest: '10:00',
      tempo: '3005'
    },
    {
      id: 22,
      name: 'Pushups',
      type: 'strength',
      sets: 4,
      reps: 4,
      rest: '10:00',
      tempo: '3005'
    }
  ]
}

const QuickAccessLogSuperset: FC = () => {
  const { t } = useTranslation()
  const { routeParams, setRoute, workoutProgress } = useQuickAccess()

  const [showVideo, setShowVideo] = useState(false)

  const renderExercise = (exercise: any, fromSuperset?: boolean) => {
    return (
      <Card
        className={`qa-log-superset__exercise-card ${
          fromSuperset ? 'qa-log-superset__superset-exercise' : ''
        }`}
        key={exercise.id}
      >
        <div>
          <h3>{exercise.name}</h3>
          <h4>
            {exercise.type === 'strength'
              ? `${exercise.sets} sets, ${exercise.reps} reps`
              : `${exercise.intensity} intensity`}
          </h4>
          <span
            className="qa-log-superset__video-link"
            onClick={() => setShowVideo(true)}
          >
            <VideoOutlinedIcon />
            <span>{t('quickaccess:workout-overview.view-video')}</span>
          </span>
        </div>
        <div className="qa-log-superset__exercise-data">
          {exercise.type === 'strength' ? (
            <>
              <div className="qa-log-superset__exercise-data-card">
                <h3>{exercise.rest}</h3>
                <h4>{t('quickaccess:workout-overview.rest')}</h4>
              </div>
              <div className="qa-log-superset__exercise-data-card">
                <h3>{exercise.tempo}</h3>
                <h4>{t('quickaccess:workout-overview.tempo')}</h4>
              </div>
            </>
          ) : (
            <div className="qa-log-superset__exercise-data-card">
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
      <Card className="qa-log-superset__superset-card" key={superset.id}>
        <h3 className="qa-log-superset__superset-card-header">
          {superset.name}
        </h3>

        {superset.exercises.map((exercise: any) =>
          renderExercise(exercise, true)
        )}
      </Card>
    )
  }

  return (
    <Styles>
      <div className="qa-log-superset__container">
        <h3>{routeParams.name}</h3>
        <ProggressBar
          percent={workoutProgress}
          trailColor="#EDEDED"
          className="qa-log-superset__progressbar"
        />

        <div className="qa-log-superset__body">{renderSuperset(superset)}</div>

        <div className="qa-log-superset__footer">
          <div className="qa-log-superset__button-group">
            <Button
              variant="secondary"
              onClick={() => setRoute(quickAccessRoutes.WORKOUT_OVERVIEW)}
            >
              Complete Workout
            </Button>
            <Button
              onClick={() =>
                setRoute(quickAccessRoutes.WORKOUT_LOGGING_SUPERSET)
              }
            >
              Start Superset
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
      </div>
    </Styles>
  )
}

export default QuickAccessLogSuperset
