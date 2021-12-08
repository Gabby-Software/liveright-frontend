import { toast } from '../../../components/toast/toast.component'
import { addTrainingPlan } from '../../../services/api/activities'
import { formatTrainingPlanData } from '../../../utils/api/activities'

interface UseTrainingSplit {
  onAdd: (data: any) => void
}

export default function useTrainingSplit(): UseTrainingSplit {
  const onAdd = async (data: any) => {
    try {
      await addTrainingPlan(formatTrainingPlanData(data))
      toast.show({ type: 'success', msg: 'Training plan successfully created' })
    } catch (e) {
      toast.show({ type: 'error', msg: JSON.stringify(e) })
      console.error(e?.message)
    }
  }

  return {
    onAdd
  }
}
