import api from '../../managers/api.manager'

export async function getTemplatesWorkouts(url: string) {
  console.log('getTemplatesWorkouts', url)
  const response = await api.get(url)
  return response.data
}

export async function getTemplatesMeals(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function getTemplatesExercises(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function getTemplatesExerciseById(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function getTemplatesData(url: string) {
  const response = await api.get(url)
  return response.data
}
