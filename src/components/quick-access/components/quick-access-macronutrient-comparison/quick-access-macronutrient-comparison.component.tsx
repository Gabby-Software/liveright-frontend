import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon
} from '../../../../assets/media/icons'
import { Styles } from './quick-access-macronutrient-comparison.styles'

interface MacronutrientComparisonProps {
  title: string
  amount: number
  target?: number
}

export default function MacronutrientComparison(
  props: MacronutrientComparisonProps
) {
  const { title, amount, target } = props

  const renderComparison = () => {
    if (target) {
      if (amount < target) {
        return (
          <>
            <ArrowDownIcon style={{ color: '#90BF45' }} />
            <span style={{ color: '#90BF45' }}>{`${Math.abs(
              amount - target
            )}g`}</span>
          </>
        )
      } else if (amount > target) {
        return (
          <>
            <ArrowUpIcon style={{ color: '#F55456' }} />
            <span style={{ color: '#F55456' }}>{`${Math.abs(
              amount - target
            )}g`}</span>
          </>
        )
      } else {
        return <CheckIcon style={{ color: '#90BF45' }} />
      }
    }
  }

  return (
    <Styles>
      <div>
        <span className="Macronutrient__value">{`${amount}g`}</span>
        <p className="Macronutrient__comparison">{renderComparison()}</p>
      </div>
      <p className="Macronutrient__name">{title}</p>
      {target && (
        <p className="Macronutrient__subtitle">{`Target ${target}g`}</p>
      )}
    </Styles>
  )
}

MacronutrientComparison.defaultProps = {
  amount: 0
}
