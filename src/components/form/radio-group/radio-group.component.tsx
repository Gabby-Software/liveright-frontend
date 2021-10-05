import { Radio, RadioGroupProps, Space } from 'antd'

import Styles from './radio-group.styles'

interface IProps extends RadioGroupProps {
  align: 'vertical' | 'horizontal'
  options: {
    label: string
    value: string
    disabled: boolean
  }[]
}

const RadioGroup = ({ align, options, ...rest }: IProps) => {
  return (
    <Radio.Group {...rest}>
      <Space direction={align}>
        {options.map((o, i) => (
          <Styles key={i} value={o.value}>
            {o.label}
          </Styles>
        ))}
      </Space>
    </Radio.Group>
  )
}

export default RadioGroup
