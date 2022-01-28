import React from 'react'

import { Styles } from '../split-day-workout-card.styles'

const EXERCISE_INFO_KEY_LABEL: { [key: string]: string } = {
  sets: 'Sets',
  reps: 'Reps',
  tempo: 'Tempo',
  rest_interval: 'Rest Interval'
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
  return (
    <Styles className="SplitDayWorkoutCard__content-card">
      <p className="SplitDayWorkoutCard__content-card-title">{data.name}</p>

      <div className="SplitDayWorkoutCard__content-card-cols">
        {Object.keys(EXERCISE_INFO_KEY_LABEL).map((k) => (
          <div className="SplitDayWorkoutCard__content-card-col" key={k}>
            <p className="SplitDayWorkoutCard__content-card-col-name">
              {EXERCISE_INFO_KEY_LABEL[k]}
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
              href={data.link}
              target="_blank"
              rel="noreferrer"
              className="SplitDayWorkoutCard__content-card-col-link"
            >
              {data.link}
            </a>
          ) : (
            <p>ND</p>
          )}
        </div>
      </div>
    </Styles>
  )
}
