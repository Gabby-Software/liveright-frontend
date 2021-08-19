import React, { Children, useMemo } from 'react'

import { classes } from '../../pipes/classes.pipe'
import Styles from './steps.styles'

type StepsProps = {
  children: React.ReactNode
  currentStep: number
  dots?: boolean
}
type StepProp = {
  children: React.ReactNode
  active?: number
}
const Step = ({ children, active }: StepProp) => {
  return (
    <div className={classes('steps__step', active && 'steps__step__active')}>
      {children}
    </div>
  )
}
const Steps = ({ children, currentStep = 0, dots }: StepsProps) => {
  const count = useMemo(() => {
    let c = 0
    Children.forEach(children, () => c++)
    return c
  }, [children])
  return (
    <Styles>
      <div
        className={'steps__wrapper'}
        style={{
          width: `${100 * count}%`,
          transform: `translateX(${(-100 / count) * currentStep}%)`
        }}
      >
        {Children.map(children, (child, i) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...child.props,
              active: i === currentStep
            })
          }
          return child
        })}
      </div>
      {dots ? (
        <div className={'steps__dots'}>
          {Children.map(children, (_, i) => (
            <div
              className={classes(
                'steps__dot',
                i === currentStep && 'steps__dot__active'
              )}
            />
          ))}
        </div>
      ) : null}
    </Styles>
  )
}
Steps.Step = Step
export default Steps
