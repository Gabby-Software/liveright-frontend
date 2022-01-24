import moment from 'moment'
import { useState } from 'react'

import { colors } from '../../../../../../assets/styles/_variables'
import {
  ChartCheckbox,
  ChartCheckboxes
} from '../../../../../../components/chart-container/chart-container.component'
import LineChart from '../../../../../../components/charts/line-chart/line-chart.component'
import { useIsMobile } from '../../../../../../hooks/is-mobile.hook'
import {
  DATE_FORMAT,
  DATE_MONTH_RENDER_FORMAT
} from '../../../../../../utils/date'
import { Styles } from './chart.styles'

interface ChartProps {
  onClose: any
  data: any[]
  isDashboard?: boolean
}

const COLORS: any = {
  weight_kgs: colors.green_90,
  fat_mass: colors.blue_80,
  lean_mass: colors.primary_v2
}

const Y_ID: any = {
  weight_kgs: 'primaryY',
  fat_mass: 'secondaryY',
  lean_mass: 'primaryY'
}

export default function Chart({ onClose, data, isDashboard }: ChartProps) {
  const isMobile = useIsMobile()
  const chartData = formatData(data)
  const [active, setActive] = useState<any>({
    weight_kgs: true,
    fat_mass: true,
    lean_mass: true
  })

  const onChange = (name: string, e: boolean) => {
    setActive((active: any) => ({
      ...active,
      [name]: e
    }))
  }

  const filterKeys = Object.keys(active).filter((key) => !!active[key])
  const dataKey = filterKeys
  const dataStroke = filterKeys.map((key) => COLORS[key])
  const dataYId = filterKeys.map((key) => Y_ID[key])

  return (
    <Styles
      isDashboard={isDashboard}
      isMobile={isMobile}
      DialogProps={{
        backText: isDashboard ? 'Back to Dashboard' : 'Back to Measurements',
        onClose
      }}
      title="Measurements"
      legendComponent={
        <div className="measurements-chart__legends">
          <div className="measurements-chart__legend">Body Weight</div>
          <div className="measurements-chart__legend">Body Fat %</div>
          <div className="measurements-chart__legend">Lean Mass</div>
        </div>
      }
      titleComponent={
        <>
          <ChartCheckboxes>
            <ChartCheckbox
              value={active.weight_kgs}
              onChange={(e: boolean) => onChange('weight_kgs', e)}
              title="Body Weight"
            />
            <ChartCheckbox
              value={active.fat_mass}
              onChange={(e: boolean) => onChange('fat_mass', e)}
              title="Body Fat"
            />
            <ChartCheckbox
              value={active.lean_mass}
              onChange={(e: boolean) => onChange('lean_mass', e)}
              title="Lean Mass"
            />
          </ChartCheckboxes>
        </>
      }
    >
      <LineChart
        height={isMobile ? '100%' : 250}
        data={chartData}
        xDataKey="date"
        dataKeys={dataKey}
        dataStroke={dataStroke}
        dataYId={dataYId}
        dot={false}
        yAxisId="primaryY"
        secondaryY={{
          yAxisId: 'secondaryY',
          tickFormatter: (tick: any) => `${tick}%`
        }}
        dataType="measurements"
      />
    </Styles>
  )
}

function formatData(data: any[]): any[] {
  return data.map((row) => ({
    ...row,
    date: moment(row.date, DATE_FORMAT).format(DATE_MONTH_RENDER_FORMAT)
  }))
}
