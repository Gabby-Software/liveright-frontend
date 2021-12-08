import api from '../../managers/api.manager'

export async function addTrainingPlan(data: any) {
  const response = await api.post('/training-plans', data)
  return response.data
}

export async function getTrainingPlans(url: string) {
  const response = await api.get(url)
  return response.data
}
