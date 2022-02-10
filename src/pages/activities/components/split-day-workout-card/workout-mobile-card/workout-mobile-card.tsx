import React from 'react'

import { VideoOutlinedIcon } from '../../../../../assets/media/icons'
import { Styles } from '../split-day-workout-card.styles'

const EXERCISE_INFO_KEY_LABEL: { [key: string]: string } = {
  sets: 'Sets',
  reps: 'Reps',
  tempo: 'Tempo',
  rest_interval: 'Rest Interval'
}

const CARDIO_INFO_KEY_LABEL: { [key: string]: string } = {
  duration: 'Duration',
  intensity: 'Intensity'
}

interface IProps {
  data: any
}

const ExerciseMobileCards = ({ data }: IProps) => {
  return (
    <div>
      {data.items?.map((item: any, i: number) => {
        const exercises = item.is_superset ? item.data : [item.data]
        return exercises.map((e: any) => (
          <ExerciseMobileCard data={e} key={e.name + i.toString()} />
        ))
      })}
    </div>
  )
}

export default ExerciseMobileCards

export const ExerciseMobileCard = ({ data }: IProps) => {
  const KEY_LABELS =
    data.info.type === 'cardio'
      ? CARDIO_INFO_KEY_LABEL
      : EXERCISE_INFO_KEY_LABEL
  return (
    <Styles className="SplitDayWorkoutCard__content-card">
      <p className="SplitDayWorkoutCard__content-card-title">{data.name}</p>

      <div className="SplitDayWorkoutCard__content-card-cols">
        {Object.keys(KEY_LABELS).map((k) => (
          <div className="SplitDayWorkoutCard__content-card-col" key={k}>
            <p className="SplitDayWorkoutCard__content-card-col-name">
              {KEY_LABELS[k]}
            </p>
            <p>{data.info?.[k]}</p>
          </div>
        ))}
        <div className="SplitDayWorkoutCard__content-card-col">
          <p className="SplitDayWorkoutCard__content-card-col-name">
            Video/Link
          </p>
          {data.link ? (
            <a
              href={
                /^https?:\/\//i.test(data.link)
                  ? data.link
                  : `https://${data.link}`
              }
              target="_blank"
              rel="noreferrer"
              className="SplitDayWorkoutCard__content-card-col-link"
            >
              <VideoOutlinedIcon /> View Video
            </a>
          ) : (
            <p>ND</p>
          )}
        </div>
      </div>
    </Styles>
  )
}
