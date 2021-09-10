import useIssuers from '../../../hooks/api/invoices/useIssuers'
import { dataToOptions } from '../../../utils/api/invoices'
import Select, { SelectProps } from '../select/select.component'
import { Option } from '../select/select.options'

interface IssuerSelectProps extends Partial<SelectProps> {
  includeAll?: boolean
  onChange: (e: any, option: any) => void
}

export default function IssuerSelect({
  includeAll = true,
  ...props
}: IssuerSelectProps) {
  const { isLoading, issuers } = useIssuers()
  const options = dataToOptions(issuers, includeAll)
  return (
    <Select
      id="client-select"
      options={options}
      onSearch={() => {}}
      Components={{ Option }}
      loading={isLoading}
      {...props}
    />
  )
}
