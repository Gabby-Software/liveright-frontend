import { toast } from '../../../components/toast/toast.component'
import { addTrainingPlan } from '../../../services/api/activities'
import { formatTrainingPlanData } from '../../../utils/api/activities'

interface UseTrainingPlan {
  onAdd: (data: any) => void
}

export default function useTrainingPlan(): UseTrainingPlan {
  const onAdd = async (data: any) => {
    try {
      await addTrainingPlan(formatTrainingPlanData(data))
      toast.show({ type: 'success', msg: 'Training plan successfully created' })
    } catch (e) {
      toast.show({ type: 'error', msg: e?.response?.data?.message })
      console.error(e)
    }
  }

  return {
    onAdd
  }
}
