import { EP_UPDATE_GOALS_TARGET } from '../../enums/api.enum'
import api from '../../managers/api.manager'
import { GoalsApiDataType } from '../../types/goals-api-data.type'

export async function updateGoalsTarget(data: GoalsApiDataType) {
  const response = await api.post(EP_UPDATE_GOALS_TARGET, data)
  return response.data
}
