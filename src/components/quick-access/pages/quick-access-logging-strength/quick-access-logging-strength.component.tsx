import React, { FC, useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook'

import { AddIcon, CheckIcon, EditIcon } from '../../../../assets/media/icons'
import VideoImg from '../../../../assets/media/quick-access-video.png'
import Formatter from '../../../../managers/formatter.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import Button from '../../../buttons/button/button.component'
import Input from '../../../form/input/input.component'
import QuickAccessExerciseInput from '../../components/quick-access-exercise-input/quick-access-exercise-input.component'
import QuickAccessModal from '../../components/quick-access-modal/quick-access-modal.component'
import ProggressBar from '../../components/quick-access-progress-bar/quick-access-progress-bar.component'
import { useQuickAccess } from '../../quick-access.context'
import { quickAccessRoutes } from '../../quick-access.routes'
import Styles from './quick-access-logging-strength.styles'

const backendExercise = {
  id: 1,
  sets: [
    {
      weight: 40,
      reps: 10
    },
    {
      weight: 60,
      reps: 10
    },
    {
      weight: 70,
      reps: 8
    }
  ]
}

const QuickAccessLoggingStrength: FC = () => {
  const { t } = useTranslation()
  const { routeParams, setRoute, workoutProgress, setWorkoutProgress } =
    useQuickAccess()
  // timer
  const restTime = new Date()
  restTime.setSeconds(restTime.getSeconds() + 600) // 10 min
  const {
    seconds,
    minutes,
    isRunning,
    restart: restartTimer,
    start: startTimer
  } = useTimer({
    expiryTimestamp: restTime,
    autoStart: false,
    onExpire: () => {
      if (isResting) {
        setIsResting(false)
        if (exerciseSets.length - 1 === currentSetIndex) {
          // go to next exercise
          setRoute(quickAccessRoutes.WORKOUT_LOG_SUPERSET)
        } else {
          // go to next set
          setCurrentSetIndex(currentSetIndex + 1)
          restartTimer(restTime, false)
        }
      }
    }
  })

  const [currentSetIndex, setCurrentSetIndex] = useState(0)
  const [editingSetIndex, setEditingSetIndex] = useState<number | null>(null)
  const [exerciseSets, setExerciseSets] = useState<{ [key: string]: number }[]>(
    backendExercise.sets
  )
  const [currentWeight, setCurrentWeight] = useState(
    exerciseSets[0].weight || 0
  )
  const [currentReps, setCurrentReps] = useState(exerciseSets[0].reps || 0)
  const [totalVolume, setTotalVolume] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [isResting, setIsResting] = useState(false)

  useEffect(() => {
    setWorkoutProgress(10)
  }, [])

  useEffect(() => {
    calculateTotalVolume()
  }, [currentSetIndex, editingSetIndex, exerciseSets.length])

  const handleChangeSet = (
    field: string,
    value: number,
    index = currentSetIndex
  ) => {
    const newSets = [...exerciseSets]
    newSets[index][field] = value
    setExerciseSets(newSets)
  }

  const calculateTotalVolume = () => {
    let totalVolume = 0
    exerciseSets.forEach((set) => {
      totalVolume += set.weight * set.reps
    })
    setTotalVolume(totalVolume)
  }

  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`
  }

  const goToNextSet = () => {
    if (exerciseSets.length - 1 === currentSetIndex) {
      // go to next exercise
      setWorkoutProgress(33)
      setRoute(quickAccessRoutes.WORKOUT_LOG_SUPERSET)
      return
    }
    handleChangeSet('weight', currentWeight)
    handleChangeSet('reps', currentReps)

    setCurrentWeight(exerciseSets[currentSetIndex + 1].weight || 0)
    setCurrentReps(exerciseSets[currentSetIndex + 1].reps || 0)
    setIsResting(true)
    if (isRunning) {
      restartTimer(restTime)
    } else {
      startTimer()
    }
  }

  const skipRest = () => {
    setIsResting(false)
    if (exerciseSets.length - 1 === currentSetIndex) {
      return
    } else {
      setCurrentSetIndex(currentSetIndex + 1)
    }
  }

  const addSet = () => {
    if (editingSetIndex !== null) {
      return
    }
    setExerciseSets(exerciseSets.concat([{ weight: 0, reps: 0 }]))
    // setEditingSetIndex(exerciseSets.length)
  }

  return (
    <Styles>
      <div className="qa-logging-strength__container">
        <h3>{routeParams.name}</h3>
        <ProggressBar
          percent={workoutProgress}
          trailColor="#EDEDED"
          className="qa-logging-strength__progressbar"
        />

        <div className="qa-logging-strength__header">
          <div>
            <h2>Pushups</h2>
            <span
              className="qa-logging-strength__video-link"
              onClick={() => setShowVideo(true)}
            >
              {t('quickaccess:logging-strength.video-link')}
            </span>
          </div>
          <div className="qa-logging-strength__exercise-info">
            <div>
              <span>{t('quickaccess:logging-strength.rest')}</span>
              <p>10:00</p>
            </div>
            <div>
              <span>{t('quickaccess:logging-strength.tempo')}</span>
              <p>2000</p>
            </div>
          </div>
        </div>

        <div className="qa-logging-strength__body">
          <div className="qa-logging-strength__table-container">
            <table id="sets-table">
              <thead>
                <tr>
                  <th>{t('quickaccess:logging-strength.set')}</th>
                  <th>{t('quickaccess:logging-strength.weight')}</th>
                  <th>{t('quickaccess:logging-strength.reps')}</th>
                  <th>{t('quickaccess:logging-strength.volume')}</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {exerciseSets.map((set, index) => (
                  <tr key={index}>
                    {index === currentSetIndex ? (
                      <>
                        <td>{(index + 1).toString().padStart(2, '0')}</td>
                        <td className="current-set">
                          <span>
                            {t('quickaccess:logging-strength.logging')}
                          </span>
                        </td>
                        <td />
                        <td />
                        <td />
                      </>
                    ) : (
                      <>
                        <td
                          className={`${
                            (index > currentSetIndex && 'upcoming-set') || ''
                          }`}
                        >
                          {(index + 1).toString().padStart(2, '0')}
                        </td>
                        <td
                          className={`${
                            (index > currentSetIndex && 'upcoming-set') || ''
                          }`}
                        >
                          {index === editingSetIndex ? (
                            <Input
                              id="edit-set-weight"
                              format={Formatter().number().min(1).max(999)}
                              value={exerciseSets[editingSetIndex].weight}
                              onChange={(e) =>
                                handleChangeSet(
                                  'weight',
                                  +e.target.value || 1,
                                  editingSetIndex
                                )
                              }
                            />
                          ) : index > currentSetIndex ? (
                            '-'
                          ) : (
                            `${set.weight.toString().padStart(2, '0')} kg`
                          )}
                        </td>
                        <td
                          className={`${
                            (index > currentSetIndex && 'upcoming-set') || ''
                          }`}
                        >
                          {index === editingSetIndex ? (
                            <Input
                              id="edit-set-reps"
                              format={Formatter().number().min(1).max(999)}
                              value={exerciseSets[editingSetIndex].reps}
                              onChange={(e) =>
                                handleChangeSet(
                                  'reps',
                                  +e.target.value || 1,
                                  editingSetIndex
                                )
                              }
                            />
                          ) : index > currentSetIndex ? (
                            '-'
                          ) : (
                            `${set.reps.toString().padStart(2, '0')} kg`
                          )}
                        </td>
                        <td
                          className={`${
                            (index > currentSetIndex && 'upcoming-set') || ''
                          }`}
                        >
                          {index > currentSetIndex
                            ? '-'
                            : set.weight * set.reps}
                        </td>
                        <td>
                          {index === editingSetIndex ? (
                            <button>
                              <CheckIcon
                                style={{ color: 'white' }}
                                onClick={() => setEditingSetIndex(null)}
                              />
                            </button>
                          ) : (
                            index < currentSetIndex && (
                              <EditIcon
                                onClick={() => setEditingSetIndex(index)}
                              />
                            )
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            className="qa-logging-strength__add-set-button"
            onClick={addSet}
          >
            <AddIcon />
            <span>{t('quickaccess:logging-strength.add-set-btn')}</span>
          </button>
        </div>

        <div className="qa-logging-strength__footer">
          <div className="qa-logging-strength__volume">
            <div>
            {t('quickaccess:logging-strength.previous-volume')} <span>{1500}</span>
            </div>
            <div>
            {t('quickaccess:logging-strength.total-volume')} <span>{totalVolume}</span>
            </div>
          </div>

          <div
            className="qa-logging-strength__input-group"
            style={{ display: isResting ? 'block' : '' }}
          >
            {isResting ? (
              <QuickAccessExerciseInput
                id="log-exercise-rest-timer"
                label="Rest Time"
                disabled
                value={formatTime(minutes, seconds)}
                fullwidth
              />
            ) : (
              <>
                <QuickAccessExerciseInput
                  id="log-exercise-current-set"
                  label="Set"
                  disabled
                  value={(currentSetIndex + 1).toString().padStart(2, '0')}
                />
                <QuickAccessExerciseInput
                  id="log-exercise-current-weight"
                  label="Kgs"
                  value={currentWeight}
                  previousValue={60}
                  format={Formatter().number().min(1).max(999)}
                  onChange={(e) => setCurrentWeight(+e.target.value || 1)}
                />
                <QuickAccessExerciseInput
                  id="log-exercise-current-reps"
                  label="Reps"
                  value={currentReps}
                  previousValue={10}
                  format={Formatter().number().min(1).max(999)}
                  onChange={(e) => setCurrentReps(+e.target.value || 1)}
                />
              </>
            )}
          </div>

          {isResting ? (
            <Button onClick={skipRest} style={{ width: '100%' }}>
              {t('quickaccess:logging-strength.skip-set-btn')}
            </Button>
          ) : (
            <div className="qa-logging-strength__button-group">
              <Button
                className="qa-logging-strength__button-skip"
                variant="dark"
                onClick={() => setRoute(quickAccessRoutes.WORKOUT_LOG_SUPERSET)}
              >
                {t('quickaccess:logging-strength.skip-exercise-btn')}
              </Button>
              <Button onClick={goToNextSet}>{`Next ${
                exerciseSets.length - 1 === currentSetIndex ? 'Exercise' : 'Set'
              }`}</Button>
            </div>
          )}
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

export default QuickAccessLoggingStrength
