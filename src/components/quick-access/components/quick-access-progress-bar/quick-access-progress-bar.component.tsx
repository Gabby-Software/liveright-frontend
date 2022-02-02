import { Progress, ProgressProps } from 'antd'
import React, { FC } from 'react'

interface Props extends ProgressProps {}

const QuickAccessProgressBar: FC<Props> = (props) => {
  return (
    <Progress
      showInfo={false}
      strokeColor="#EF1733"
      strokeLinecap="round"
      trailColor="#515151"
      strokeWidth={6}
      {...props}
    />
  )
}

export default QuickAccessProgressBar
