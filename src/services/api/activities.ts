import api from '../../managers/api.manager'

export async function addTrainingPlan(data: any) {
  const response = await api.post('/training-plans', data)
  return response.data
}
