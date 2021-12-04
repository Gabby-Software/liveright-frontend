import React from 'react'
import {
  CartesianGrid,
  Line,
  LineChart as ReLineChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'
import styled from 'styled-components'

import { SadEmojiIcon } from '../../../assets/media/icons'
import { colors } from '../../../assets/styles/_variables'
import { NoData } from '../../no-data/no-data.component'

const BlankContainer = styled.div`
  svg {
    display: block;
    margin: 0 auto;
    stroke: #c2c2c2;
    margin-bottom: 20px;
  }
  p {
    font-size: 14px;
    line-height: 20px;
    color: #5e5e5e;
  }
`

interface LineChartProps {
  height?: number | string
  data: any[]
  range?: string
  xDataKey: string
  dataKeys: string[]
  dataStroke?: string[]
  dataYId?: string[]
  yTickFormatter?: any
  tooltip?: any
  dot?: boolean
  yAxisId?: string
  secondaryY?: {
    yAxisId?: string
    tickFormatter?: any
  }
}

export default function LineChart({
  height = 300,
  range,
  data,
  xDataKey,
  dataKeys,
  dataYId,
  dataStroke,
  yTickFormatter,
  tooltip,
  dot = true,
  yAxisId,
  secondaryY
}: LineChartProps) {
  if (data.length === 0) {
    return (
      <NoData height={height}>
        <BlankContainer>
          <SadEmojiIcon />
          <p>{`No earnings this ${range || ''}`}</p>
        </BlankContainer>
      </NoData>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReLineChart data={data} margin={{ left: -20, top: 10, bottom: 10 }}>
        <CartesianGrid
          vertical={false}
          horizontal={<line strokeWidth={0.5} />}
        />
        <XAxis
          axisLine={false}
          tickLine={false}
          padding={{ left: 10, right: 10 }}
          dy={15}
          height={40}
          tick={{ fill: colors.primaryDark_v2, fontSize: '0.75rem' }}
          dataKey={xDataKey}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          dx={0}
          tick={{ fill: colors.primaryDark_v2, fontSize: '0.75rem' }}
          tickFormatter={yTickFormatter}
          yAxisId={yAxisId}
        />
        {!!secondaryY && (
          <YAxis
            axisLine={false}
            tickLine={false}
            dx={15}
            yAxisId={secondaryY.yAxisId}
            orientation="right"
            tickFormatter={secondaryY.tickFormatter}
          />
        )}
        {dataKeys.map((key, index) => (
          <Line
            key={key}
            type="linear"
            strokeWidth={2}
            stroke={dataStroke?.[index] || colors.green_90}
            yAxisId={dataYId?.[index]}
            dataKey={key}
            dot={(props) => {
              if (!dot) return <></>
              return (
                <circle
                  {...props}
                  strokeWidth={3}
                  r={5}
                  {...(props.payload.dotColor && {
                    stroke: props.payload.dotColor
                  })}
                />
              )
            }}
          />
        ))}
        {tooltip}
      </ReLineChart>
    </ResponsiveContainer>
  )
}
