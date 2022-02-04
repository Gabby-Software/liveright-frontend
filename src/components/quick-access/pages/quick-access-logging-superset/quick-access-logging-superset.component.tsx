import React, { FC, useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook'

import { AddIcon, CheckIcon, EditIcon } from '../../../../assets/media/icons'
import VideoImg from '../../../../assets/media/quick-access-video.png'
import Formatter from '../../../../managers/formatter.manager'
// import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import Button from '../../../buttons/button/button.component'
import Input from '../../../form/input/input.component'
import QuickAccessExerciseInput from '../../components/quick-access-exercise-input/quick-access-exercise-input.component'
import QuickAccessModal from '../../components/quick-access-modal/quick-access-modal.component'
import ProggressBar from '../../components/quick-access-progress-bar/quick-access-progress-bar.component'
import { useQuickAccess } from '../../quick-access.context'
import { quickAccessRoutes } from '../../quick-access.routes'
import Styles, { AddSetModal } from './quick-access-logging-superset.styles'

const backendExercise = {
  id: 1,
  sets: [
    {
      exercise: 'A',
      exerciseName: 'Pushups',
      weight: 40,
      reps: 10
    },
    {
      exercise: 'B',
      exerciseName: 'Dumbell Curl',
      weight: 60,
      reps: 10
    },
    {
      exercise: 'C',
      exerciseName: 'Bench Press',
      weight: 70,
      reps: 8
    }
  ]
}

const QuickAccessLoggingSuperset: FC = () => {
  // const { t } = useTranslation()
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
          setRoute(quickAccessRoutes.WORKOUT_LOGGING_CARDIO)
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
  const [exerciseSets, setExerciseSets] = useState<{ [key: string]: any }[]>(
    backendExercise.sets
  )
  const [currentWeight, setCurrentWeight] = useState(
    exerciseSets[0].weight || 0
  )
  const [currentReps, setCurrentReps] = useState(exerciseSets[0].reps || 0)
  const [totalVolume, setTotalVolume] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [showAddSetModal, setShowAddSetModal] = useState(false)
  const [isResting, setIsResting] = useState(false)

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
      setWorkoutProgress(66)
      setRoute(quickAccessRoutes.WORKOUT_LOGGING_CARDIO)
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

  const addSet = (exercise: string, exerciseName: string) => {
    if (editingSetIndex !== null) {
      return
    }
    setExerciseSets(
      exerciseSets.concat([{ exercise, exerciseName, weight: 0, reps: 0 }])
    )
    setShowAddSetModal(false)
    // setEditingSetIndex(exerciseSets.length)
  }

  return (
    <Styles>
      <div className="qa-logging-superset__container">
        <h3>{routeParams.name}</h3>
        <ProggressBar
          percent={workoutProgress}
          trailColor="#EDEDED"
          className="qa-logging-superset__progressbar"
        />

        <div className="qa-logging-superset__body">
          <div className="qa-logging-superset__table-container">
            <table id="sets-table">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Set</th>
                  <th>Weight</th>
                  <th>Reps</th>
                  <th>Volume</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {exerciseSets.map((set, index) => (
                  <tr key={index}>
                    {index === currentSetIndex ? (
                      <>
                        <td>{set.exercise}</td>
                        <td className="current-set">
                          <span>Logging...</span>
                        </td>
                        <td />
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
                          {set.exercise}
                        </td>
                        <td
                          className={`${
                            (index > currentSetIndex && 'upcoming-set') || ''
                          }`}
                        >
                          {1}
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
            className="qa-logging-superset__add-set-button"
            onClick={() => setShowAddSetModal(true)}
          >
            <AddIcon /> <span>Add additional set</span>
          </button>
        </div>

        <div className="qa-logging-superset__footer">
          <div className="qa-logging-superset__current-exercise">
            <div>
              <h2>{exerciseSets[currentSetIndex].exerciseName}</h2>
              <span
                className="qa-logging-superset__video-link"
                onClick={() => setShowVideo(true)}
              >
                View video
              </span>
            </div>
            <div className="qa-logging-superset__exercise-info">
              <div>
                <span>Rest</span>
                <p>10:00</p>
              </div>
              <div>
                <span>Tempo</span>
                <p>2000</p>
              </div>
            </div>
          </div>
          <div className="qa-logging-superset__volume">
            <div>
              Previous Volume <span>{1500}</span>
            </div>
            <div>
              Total Volume <span>{totalVolume}</span>
            </div>
          </div>

          <div
            className="qa-logging-superset__input-group"
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
              Skip
            </Button>
          ) : (
            <div className="qa-logging-superset__button-group">
              <Button
                className="qa-logging-superset__button-skip"
                variant="dark"
                onClick={() =>
                  setRoute(quickAccessRoutes.WORKOUT_LOGGING_CARDIO)
                }
              >
                Skip Exercise
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
        <AddSetModal
          visible={showAddSetModal}
          onCancel={() => setShowAddSetModal(false)}
          footer={null}
        >
          <h1>Add set</h1>
          <h2>Please select for which exercise:</h2>

          <div>
            {backendExercise.sets.map((set, index) => (
              <button
                key={index}
                onClick={() => addSet(set.exercise, set.exerciseName)}
              >
                {`${set.exercise} - ${set.exerciseName}`}
              </button>
            ))}
          </div>
        </AddSetModal>
      </div>
    </Styles>
  )
}

export default QuickAccessLoggingSuperset
