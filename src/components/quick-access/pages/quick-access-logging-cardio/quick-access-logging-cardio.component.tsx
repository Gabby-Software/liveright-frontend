import React, { FC, useState } from 'react'
import { useTimer } from 'react-timer-hook'

import VideoImg from '../../../../assets/media/quick-access-video.png'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import Button from '../../../buttons/button/button.component'
import QuickAccessBack from '../../components/quick-access-back/quick-access-back.component'
import QuickAccessModal from '../../components/quick-access-modal/quick-access-modal.component'
import QuickAccessProgressBar from '../../components/quick-access-progress-bar/quick-access-progress-bar.component'
import { useQuickAccess } from '../../quick-access.context'
import { quickAccessRoutes } from '../../quick-access.routes'
import Styles from './quick-access-logging-cardio.styles'

interface Props {}

const QuickAccessLoggingCardio: FC<Props> = () => {
  const { t } = useTranslation()
  const { routeParams, setRoute, workoutProgress } = useQuickAccess()

  const [showVideo, setShowVideo] = useState(false)
  const [timerStarted, setTimerStarted] = useState(false)

  const time = new Date()
  time.setSeconds(time.getSeconds() + 600) // 10 min
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause: pauseTimer,
    resume: resumeTimer
  } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
    onExpire: () => console.warn('onExpire called')
  })

  const startTimer = () => {
    if (!timerStarted) {
      start()
      setTimerStarted(true)
    } else {
      resumeTimer()
    }
  }

  const formatTime = (hours: number, minutes: number, seconds: number) => {
    return `${hours < 10 ? '0' : ''}${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const renderButtonText = () => {
    if (!timerStarted && !isRunning) {
      return 'Start'
    }
    if (timerStarted && isRunning) {
      return 'Pause'
    }
    if (timerStarted && !isRunning) {
      return 'Resume'
    }
  }

  return (
    <Styles>
      <div className="qa-logging-cardio__container">
        <QuickAccessBack
          label="overview"
          route={quickAccessRoutes.WORKOUT_OVERVIEW}
          color={getColorCarry('neutral_50')}
        />
        <div className="qa-logging-cardio__header">
          <h3>{routeParams?.name}</h3>
          <QuickAccessProgressBar percent={workoutProgress} />
        </div>

        <h2>Treadmill Run</h2>
        <span
          className="qa-logging-cardio__video-link"
          onClick={() => setShowVideo(true)}
        >
          {t('quickaccess:logging-cardio.video-link')}
        </span>
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
        <div>
          <span className="qa-logging-cardio__timer">
            {formatTime(hours, minutes, seconds)}
          </span>
          <div className="qa-logging-cardio__timer-background" />
        </div>

        <div className="qa-logging-cardio__intensity">
          <h2>High</h2>
          <span> {t('quickaccess:logging-cardio.intensity')}</span>
        </div>

        <div className="qa-logging-cardio__button-group">
          <Button
            variant="dark"
            className="qa-logging-cardio__btn-mark-completed"
            onClick={() => setRoute(quickAccessRoutes.WORKOUT_OVERVIEW)}
          >
            {t('quickaccess:logging-cardio.mark-completed-btn')}
          </Button>
          <Button onClick={isRunning ? pauseTimer : startTimer}>
            {renderButtonText()}
          </Button>
        </div>
      </div>
    </Styles>
  )
}

export default QuickAccessLoggingCardio
