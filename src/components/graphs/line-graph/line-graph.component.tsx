import moment, { Moment } from 'moment'
import React, { useMemo, useRef } from 'react'

import logger from '../../../managers/logger.manager'
import { forOf } from '../../../pipes/for-of.pipe'
import Styles from './line-graph.styles'

type Props = {
  children: React.ReactNode
  startDate: Moment
  endDate: Moment
  minValue: number
  maxValue: number
}
const CHART_WIDTH = 340
const CHART_HEIGHT = 200
const PB = 18
const PL = 20
const PT = 10
const PR = 3
const LineGraph = ({
  children,
  maxValue,
  minValue,
  startDate,
  endDate
}: Props) => {
  const filterID = useRef(Math.random().toString())
  const days = useMemo(() => {
    return moment.duration(endDate.diff(startDate)).asDays() / 4
  }, [startDate, endDate])
  logger.info(
    'DAYS',
    days,
    moment.duration(endDate.diff(startDate)).asDays(),
    startDate.format('YYYY-MM-DD'),
    endDate.format('YYYY-MM-DD'),
    moment().add(-1, 'month').format('YYYY-MM-DD')
  )
  return (
    <Styles
      width={CHART_WIDTH}
      height={CHART_HEIGHT}
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className={'chart__axis__lines'} stroke={'#DFDFE1'} strokeWidth={1}>
        {forOf(5, (i) => (
          <line
            x1={PL}
            y1={PT + ((CHART_HEIGHT - PB - PT) / 4) * i}
            x2={CHART_WIDTH - PR}
            y2={PT + ((CHART_HEIGHT - PB - PT) / 4) * i}
          />
        ))}
      </g>
      <g
        className={'chart__y__axis'}
        fill={'#DFDFE1'}
        fontSize={8}
        textAnchor={'end'}
        dominantBaseline={'middle'}
      >
        {forOf(5, (i) => (
          <text x={PL - 5} y={PT + ((CHART_HEIGHT - PB - PT) / 4) * i}>
            {i < 4
              ? Math.round(minValue + ((maxValue - minValue) / 5) * (4 - i))
              : null}
          </text>
        ))}
      </g>
      <g
        className={'chart__y__axis'}
        fill={'#DFDFE1'}
        fontSize={8}
        textAnchor={'middle'}
        dominantBaseline={'hanging'}
      >
        {forOf(5, (i) => (
          <text
            x={PL + 10 + ((CHART_WIDTH - PL - PR - 22) / 4) * i}
            y={CHART_HEIGHT - PB + 8}
          >
            {moment(startDate)
              .add(Math.round(days * i), 'days')
              .format('DD/MM')}
          </text>
        ))}
      </g>
      <g filter={`url(#${filterID.current})`}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...child.props,
              min: minValue,
              max: maxValue
            })
          }
          return child
        })}
      </g>
      <defs>
        <filter
          id={filterID.current}
          x="0.400391"
          y="0.0683594"
          width={CHART_WIDTH}
          height={CHART_HEIGHT}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.966667 0 0 0 0 0.221528 0 0 0 0 0.313748 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </Styles>
  )
}
type LineGraphChartProps = {
  color: string
  data: number[]
  min?: number
  max?: number
}
const LineGraphChart = ({
  color,
  data,
  min = 0,
  max = 0
}: LineGraphChartProps) => {
  const interval = useMemo(
    () => (CHART_WIDTH - PL - PR) / (data.length - 1),
    [data]
  )
  const y = (val: number) =>
    ((val - min) / (max - min)) * (CHART_HEIGHT - PT - PB) + PT
  const x = (i: number) => interval * i + PL
  logger.info('MINMAX', min, max)
  const path = useMemo(() => {
    return data.reduce(
      (d, val, i) => d + `L${x(i)} ${y(val)} `,
      `M${x(0)} ${y(data[0])} `
    )
  }, [data])
  return <path d={path} stroke={color} strokeWidth="3" />
}
LineGraph.Chart = LineGraphChart
export default LineGraph
