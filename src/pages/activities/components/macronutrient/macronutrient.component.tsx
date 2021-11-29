import { Styles } from './macronutrient.styles'

interface MacronutrientProps {
  title: string
}

export default function Macronutrient({ title }: MacronutrientProps) {
  return (
    <Styles>
      <p className="Macronutrient__name">{title}</p>
      <p className="Macronutrient__value">11g</p>
      <p className="Macronutrient__subtitle">Target 10g</p>
    </Styles>
  )
}
