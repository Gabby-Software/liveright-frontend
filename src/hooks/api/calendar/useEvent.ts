import { toast } from '../../../components/toast/toast.component'
import { serverError } from '../../../pipes/server-error.pipe'
import { addEvent } from '../../../services/api/calendar'
import { formatEventValues } from '../../../utils/api/calendar'
import { useAuth } from '../../auth.hook'

type OnAdd = (values: any, onSuccess: any) => void

interface UseEvent {
  onAdd: OnAdd
}

export default function useEvent(): UseEvent {
  const auth = useAuth()

  const onAdd: OnAdd = async (values, onSuccess) => {
    try {
      await addEvent(formatEventValues(values, auth.id, auth.type))
      toast.show({ type: 'success', msg: 'Event successfully added' })
      onSuccess()
    } catch (e) {
      toast.show({ type: 'error', msg: serverError(e) })
      console.error(e)
    }
  }

  return {
    onAdd
  }
}
