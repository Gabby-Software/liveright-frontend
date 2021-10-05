import { PropsWithChildren, ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'

import {
  CaretLeftIcon,
  CrossIcon,
  LandscapePhoneIcon
} from '../../assets/media/icons'
import { mediaQueries } from '../../enums/screen-sizes.enum'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import Button from '../buttons/button/button.component'
import Checkbox from '../form/checkbox/checkbox.component'
import { EmptyPlaceholder, LoadingPlaceholder } from '../placeholders'
import {
  ChartCheckboxesStyles,
  CheckboxStyles,
  DialogStyles,
  Styles
} from './chart-container.styles'

interface ChartContainerProps {
  className?: string
  title?: string
  titleComponent?: ReactNode
  DialogProps: LandscapeDialogProps
  loading?: boolean
  noData?: boolean
}

export default function ChartContainer({
  className,
  DialogProps,
  children,
  title,
  titleComponent,
  loading,
  noData
}: PropsWithChildren<ChartContainerProps>) {
  const isMobile = useIsMobile()
  const isLandscape = useMediaQuery({ query: mediaQueries.LANDSCAPE })

  if (isMobile && !isLandscape) {
    return <LandscapeDialog {...DialogProps} />
  }
  return (
    <Styles className={className}>
      <div className="chart__title-container">
        <h4 className="chart__title">{title}</h4>

        {titleComponent}

        {isMobile && <CrossIcon onClick={DialogProps.onClose} />}
      </div>

      {loading ? (
        <LoadingPlaceholder spacing />
      ) : noData ? (
        <EmptyPlaceholder spacing />
      ) : (
        <div className="chart__chart-container">{children}</div>
      )}
    </Styles>
  )
}

interface LandscapeDialogProps {
  backText: string
  onClose: any
}

function LandscapeDialog({ backText, onClose }: LandscapeDialogProps) {
  return (
    <DialogStyles open onClose={() => {}}>
      <div className="chart-dialog__container">
        <span className="chart-dialog__icon">
          <LandscapePhoneIcon />
        </span>

        <p className="chart-dialog__title">
          Please use phone in landscape to see graph
        </p>

        <Button
          variant="text"
          size="sm"
          className="chart-dialog__button"
          onClick={onClose}
        >
          <CaretLeftIcon />
          {backText}
        </Button>
      </div>
    </DialogStyles>
  )
}

export function ChartCheckboxes({ children }: PropsWithChildren<any>) {
  return <ChartCheckboxesStyles>{children}</ChartCheckboxesStyles>
}

interface ChartCheckboxProps {
  value: boolean
  onChange: any
  title: string
}

export function ChartCheckbox({ title, value, onChange }: ChartCheckboxProps) {
  return (
    <CheckboxStyles>
      <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />
      <p className="checkbox__text">{title}</p>
    </CheckboxStyles>
  )
}
