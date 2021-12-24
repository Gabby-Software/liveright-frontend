import useSWR from 'swr'

import { getTrainingPlanExercises } from '../../../services/api/activities'

interface UseTrainingPlanExercise {
  isLoading: boolean
  exercises: any
}

interface UseTrainingPlanExerciseConfig {
  id?: string
  revisionId?: string
}

export default function useTrainingPlanExercises(
  config: UseTrainingPlanExerciseConfig = {}
): UseTrainingPlanExercise {
  const { data, error } = useSWR(
    () =>
      config.id && config.revisionId
        ? `/training-plans/${config.id}/revisions/${config.revisionId}/get-items`
        : null,
    getTrainingPlanExercises
  )

  const isLoading = !data && !error
  const exercises =
    data?.data?.map((d: any) => ({
      name: d.data.name,
      info: { ...d.data.info, link: d.data.link }
    })) || []

  return {
    isLoading,
    exercises
  }
}
