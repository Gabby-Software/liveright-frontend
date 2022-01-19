import api from '../../managers/api.manager'

export async function getTemplatesWorkouts(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function getTemplatesWorkoutById(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function editTemplatesWorkout(id: string, data: any) {
  const response = await api.put(`/workouts/${id}`, data)
  return response.data.data
}

export async function deleteTemplatesWorkout(id: string) {
  const response = await api.delete(`/workouts/${id}`)
  return response.data.data
}

export async function getTemplatesMeals(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function getTemplatesMeal(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function editTemplatesMeal(id: string, data: any) {
  const response = await api.put(`/meals/${id}`, data)
  return response.data.data
}

export async function deleteTemplatesMeal(id: string) {
  const response = await api.delete(`/meals/${id}`)
  return response.data.data
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

export async function getTemplatesTrainingPlans(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function getTemplatesTrainingPlanById(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function getTemplatesTrainingRevisionById(url: string) {
  const response = await api.get(url)
  return response.data
}
