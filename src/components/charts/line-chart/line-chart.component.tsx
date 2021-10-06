import React from 'react'
import {
  CartesianGrid,
  Line,
  LineChart as ReLineChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'

import { colors } from '../../../assets/styles/_variables'

interface LineChartProps {
  height?: number | string
  data: any[]
  xDataKey: string
  dataKeys: string[]
  dataStroke?: string[]
  yTickFormatter?: any
  tooltip?: any
  dot?: boolean
}

export default function LineChart({
  height = 300,
  data,
  xDataKey,
  dataKeys,
  dataStroke,
  yTickFormatter,
  tooltip,
  dot = true
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReLineChart data={data} margin={{ top: 10, bottom: 10 }}>
        <CartesianGrid
          vertical={false}
          horizontal={<line strokeWidth={0.5} />}
        />
        <XAxis
          axisLine={false}
          tickLine={false}
          padding={{ left: 30, right: 30 }}
          dy={15}
          height={40}
          tick={{ fill: colors.primaryDark_v2, fontSize: '0.75rem' }}
          dataKey={xDataKey}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          dx={-15}
          tick={{ fill: colors.primaryDark_v2, fontSize: '0.75rem' }}
          tickFormatter={yTickFormatter}
        />
        {dataKeys.map((key, index) => (
          <Line
            key={key}
            type="linear"
            strokeWidth={2}
            stroke={dataStroke?.[index] || colors.green_90}
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
