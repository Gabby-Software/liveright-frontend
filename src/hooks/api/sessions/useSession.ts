import { toast } from '../../../components/toast/toast.component'
import { cancelSession } from '../../../services/api/sessions'

interface UseSessionConfig {
  mutate?: any
}

export interface UseSession {
  onCancel: (id: number) => void
}

export default function useSession(config: UseSessionConfig = {}): UseSession {
  const onCancel = async (id: number) => {
    try {
      await cancelSession(id)
      config.mutate?.()
      toast.show({ type: 'success', msg: 'Session cancelled successfully' })
    } catch (e) {
      console.error(e)
    }
  }

  return {
    onCancel
  }
}
