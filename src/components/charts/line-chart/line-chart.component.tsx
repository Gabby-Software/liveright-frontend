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
  height?: number
  data: any[]
  xDataKey: string
  dataKeys: string[]
}

export default function LineChart({
  height = 300,
  data,
  xDataKey,
  dataKeys
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReLineChart data={data}>
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
          tick={{ fill: colors.primaryDark_v2 }}
          dataKey={xDataKey}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          dx={-15}
          tick={{ fill: colors.primaryDark_v2 }}
        />
        {dataKeys.map((key) => (
          <Line
            key={key}
            type="linear"
            strokeWidth={2}
            stroke={colors.green_90}
            dataKey={key}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  )
}
