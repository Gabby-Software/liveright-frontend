import { Styles } from './macronutrient.styles'

interface MacronutrientProps {
  title: string
  amount: string
  target?: string
}

export default function Macronutrient(props: MacronutrientProps) {
  const { title, amount, target } = props
  return (
    <Styles>
      <p className="Macronutrient__name">{title}</p>
      <p className="Macronutrient__value">{amount}</p>
      {target && <p className="Macronutrient__subtitle">Target ${target}</p>}
    </Styles>
  )
}

Macronutrient.defaultProps = {
  amount: '11g'
}
