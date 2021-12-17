import api from '../../managers/api.manager'

export async function addTrainingPlan(data: any) {
  const response = await api.post('/training-plans', data)
  return response.data.data
}

export async function editTrainingPlan(
  id: string,
  revisionId: string,
  data: any
) {
  const response = await api.put(
    `/training-plans/${id}/revisions/${revisionId}`,
    data
  )
  return response.data.data
}

export async function getTrainingPlans(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function getTrainingPlanRevision(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function getTrainingPlan(url: string) {
  const response = await api.get(url)
  return response.data
}
