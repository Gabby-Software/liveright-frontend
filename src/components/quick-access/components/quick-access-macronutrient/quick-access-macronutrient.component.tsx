import { Styles } from './quick-access-macronutrient.styles'

interface MacronutrientProps {
  title: string
  amount: string
  target?: string
  variant?: 'light' | 'dark'
}

export default function Macronutrient(props: MacronutrientProps) {
  const { title, amount, target, variant = 'dark' } = props
  return (
    <Styles variant={variant}>
      <p className="Macronutrient__name">{title}</p>
      <p className="Macronutrient__value">{amount}</p>
      {target && <p className="Macronutrient__subtitle">Target ${target}</p>}
    </Styles>
  )
}

Macronutrient.defaultProps = {
  amount: '0g'
}
