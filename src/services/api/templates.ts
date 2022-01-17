import api from '../../managers/api.manager'

export async function getTemplatesWorkouts(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function getTemplatesMeals(url: string) {
  const response = await api.get(url)
  return response.data
}
