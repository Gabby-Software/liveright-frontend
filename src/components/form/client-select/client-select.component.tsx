import useClients from '../../../hooks/api/clients/useClients'
import { dataToOptions } from '../../../utils/api/clients'
import Select, { SelectProps } from '../select/select.component'

export default function ClientSelect(props: Partial<SelectProps>) {
  const { clients } = useClients()
  const options = dataToOptions(clients)
  return <Select id="client-select" options={options} {...props} />
}
