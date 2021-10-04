import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'

import { toast } from '../../../components/toast/toast.component'
import { Routes } from '../../../enums/routes.enum'
import { handleErrorMessage } from '../../../managers/api.manager'
import { addMeasurements } from '../../../services/api/progress'
import { isClient } from '../../../utils/api/auth'
import { formatMeasurementsValues } from '../../../utils/api/progress'
import { getRoute } from '../../../utils/routes'
import { useAuth } from '../../auth.hook'

interface UseMeasurements {
  onAdd: (values: any) => void
}

export default function useMeasurements(): UseMeasurements {
  const history = useHistory()
  const params = useParams<any>()
  const { type } = useAuth()

  const onAdd = async (values: any) => {
    try {
      await addMeasurements(formatMeasurementsValues(values))

      toast.show({ type: 'success', msg: 'Measurements saved!' })

      history.push(
        isClient(type)
          ? Routes.PROGRESS_CLIENT_MEASUREMENTS
          : getRoute(Routes.PROGRESS_MEASUREMENTS, { id: params.id })
      )
    } catch (e) {
      handleErrorMessage(e)
      console.error(e)
    }
  }

  return {
    onAdd
  }
}
