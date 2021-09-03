import useClients from '../../../hooks/api/clients/useClients'
import { dataToOptions } from '../../../utils/api/clients'
import Select, { SelectProps } from '../select/select.component'

interface ClientSelectProps extends Partial<SelectProps> {
  includeAll?: boolean
}

export default function ClientSelect({
  includeAll = true,
  ...props
}: ClientSelectProps) {
  const { clients } = useClients()
  const options = dataToOptions(clients, includeAll)
  return <Select id="client-select" options={options} {...props} />
}
