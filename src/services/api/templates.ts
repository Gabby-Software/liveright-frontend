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

export async function editTemplatesDietPlan(id: string, data: any) {
  const response = await api.put(`/diet-plan-templates/${id}`, data)
  return response.data.data
}

export async function deleteTemplatesDietPlan(id: string) {
  const response = await api.delete(`/diet-plan-templates/${id}`)
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

export async function getTemplatesFood(url: string) {
  const response = await api.get(url)
  return response.data
}
export async function editTemplatesFood(id: string, data: any) {
  const response = await api.put(`/foods/${id}`, data)
  return response.data.data
}

export async function deleteTemplatesFood(id: string) {
  const response = await api.delete(`/foods/${id}`)
  return response.data.data
}

export async function editTemplatesMealPlan(id: string, data: any) {
  const response = await api.put(`/meal-plans/${id}`, data)
  return response.data.data
}

export async function deleteTemplatesMealPlan(id: string) {
  const response = await api.delete(`/meal-plans/${id}`)
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

export async function editTemplatesTrainingPlan(id: string, data: any) {
  const response = await api.put(`/training-plan-templates/${id}`, data)
  return response.data.data
}

export async function deleteTemplatesTrainingPlan(id: string) {
  const response = await api.delete(`/training-plan-templates/${id}`)
  return response.data.data
}

export async function editTemplatesTrainingSplit(id: string, data: any) {
  const response = await api.put(`/training-split-templates/${id}`, data)
  return response.data.data
}

export async function deleteTemplatesTrainingSplit(id: string) {
  const response = await api.delete(`/training-split-templates/${id}`)
  return response.data.data
}

export async function getTemplatesWorkoutDays(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function getTemplatesWorkoutDayById(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function editTemplatesWorkoutDay(id: string, data: any) {
  const response = await api.put(`/workout-plans/${id}`, data)
  return response.data.data
}
