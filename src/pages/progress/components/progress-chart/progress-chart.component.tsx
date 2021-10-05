import moment from 'moment'
import { useContext, useState } from 'react'
import { Tooltip } from 'recharts'

import { colors } from '../../../../assets/styles/_variables'
import {
  ChartCheckbox,
  ChartCheckboxes
} from '../../../../components/chart-container/chart-container.component'
import LineChart from '../../../../components/charts/line-chart/line-chart.component'
import { TooltipContainer } from '../../../../components/charts/tooltip'
import Checkbox from '../../../../components/form/checkbox/checkbox.component'
import { HealthOnlyInclude } from '../../../../hooks/api/progress/useHealth'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { capitalize } from '../../../../pipes/capitalize.pipe'
import { DATE_FORMAT, DATE_MONTH_RENDER_FORMAT } from '../../../../utils/date'
import { shortNum } from '../../../../utils/numbers'
import { HealthData, QualityType } from '../../progress.types'
import ProgressHealthDataContext from '../progress-health-data/progress-health-data.context'
import { Styles } from './progress-chart.styles'

interface HealthChartProps {
  onClose: () => void
}

export default function HealthChart({ onClose }: HealthChartProps) {
  const { t } = useTranslation()
  const [tooltipValue, setTooltipValue] = useState(true)
  const [tooltipQuantity, setTooltipQuantity] = useState(true)

  const { health, onlyInclude, isLoading } = useContext(
    ProgressHealthDataContext
  )

  const isMobile = useIsMobile()

  const chartData = formatChartData(health, onlyInclude)

  return (
    <Styles
      DialogProps={{ backText: 'Back to Health', onClose }}
      title={t(`progress:${onlyInclude}`)}
      noData={!health.length}
      loading={isLoading}
      titleComponent={
        <>
          <div className="chart__quality">
            <p className="chart__quality-text">Good</p>
            <p className="chart__quality-text">Bad</p>
            <p className="chart__quality-text">Average</p>
          </div>

          <ChartCheckboxes>
            <ChartCheckbox
              value={tooltipValue}
              onChange={(e: any) => setTooltipValue(e)}
              title={`Show ${t(`progress:${onlyInclude}`)}`}
            />
            <ChartCheckbox
              value={tooltipQuantity}
              onChange={(e: any) => setTooltipQuantity(e)}
              title="Show Quality"
            />
          </ChartCheckboxes>
        </>
      }
    >
      <LineChart
        height={isMobile ? '100%' : 250}
        data={chartData}
        xDataKey="date"
        dataKeys={['value']}
        dataStroke={[colors.secondary4_v2]}
        yTickFormatter={
          onlyInclude === 'steps' ? (tick: number) => shortNum(tick) : undefined
        }
        tooltip={
          tooltipQuantity || tooltipValue ? (
            <Tooltip
              cursor={false}
              content={(props) => (
                <TooltipContent
                  {...props}
                  tooltipValue={tooltipValue}
                  tooltipQuantity={tooltipQuantity}
                />
              )}
            />
          ) : null
        }
      />
    </Styles>
  )
}

function formatChartData(health: HealthData[], onlyInclude: HealthOnlyInclude) {
  try {
    if (onlyInclude === 'sleep') {
      return health.map((h) => ({
        value: moment.duration(h.sleep?.sleep_duration).asHours(),
        date: moment(h.date, DATE_FORMAT).format(DATE_MONTH_RENDER_FORMAT),
        dotColor: getDotColor(h.sleep?.quality),
        label: 'Sleep',
        tooltipValue: moment.duration(h.sleep?.sleep_duration).asHours() + 'h',
        quality: h.sleep?.quality ? capitalize(h.sleep?.quality) : '-'
      }))
    }
    if (onlyInclude === 'heart_rate') {
      return health.map((h) => ({
        value: h.heart_rate?.avg_rate ? Number(h.heart_rate.avg_rate) : 0,
        date: moment(h.date, DATE_FORMAT).format(DATE_MONTH_RENDER_FORMAT),
        dotColor: getDotColor(h.heart_rate?.quality),
        label: 'Heart rate',
        tooltipValue: h.heart_rate?.avg_rate
          ? Number(h.heart_rate.avg_rate)
          : 0,
        quality: h.heart_rate?.quality ? capitalize(h.heart_rate?.quality) : '-'
      }))
    }
    if (onlyInclude === 'steps') {
      return health.map((h) => ({
        value: h.steps?.daily_steps ? Number(h.steps.daily_steps) : 0,
        date: moment(h.date, DATE_FORMAT).format(DATE_MONTH_RENDER_FORMAT),
        dotColor: getDotColor(h.steps?.quality),
        label: 'Steps',
        tooltipValue: h.steps?.daily_steps
          ? shortNum(Number(h.steps.daily_steps))
          : 0,
        quality: h.steps?.quality ? capitalize(h.steps?.quality) : '-'
      }))
    }
    if (onlyInclude === 'blood_glucose') {
      return health.map((h) => ({
        value: h.blood_glucose?.glucose ? Number(h.blood_glucose.glucose) : 0,
        date: moment(h.date, DATE_FORMAT).format(DATE_MONTH_RENDER_FORMAT),
        dotColor: getDotColor(h.blood_glucose?.quality),
        label: 'Blood Glucose',
        tooltipValue: h.blood_glucose?.glucose
          ? Number(h.blood_glucose.glucose) + 'Mg/dl'
          : 0,
        quality: h.blood_glucose?.quality
          ? capitalize(h.blood_glucose?.quality)
          : '-'
      }))
    }
    return []
  } catch (e) {
    console.error(e)
    return []
  }
}

function getDotColor(quality?: QualityType): string {
  switch (quality) {
    case 'low':
      return '#EF1733'
    case 'high':
    case 'good':
      return '#00B334'
    default:
      return '#EDD92E'
  }
}

function TooltipContent({ payload, tooltipValue, tooltipQuantity }: any) {
  const data = payload?.[0]?.payload || {}
  return (
    <TooltipContainer>
      {tooltipValue && (
        <p>
          {data.label}: {data.tooltipValue}
        </p>
      )}
      {tooltipQuantity && <p>Quality: {data.quality}</p>}
    </TooltipContainer>
  )
}
