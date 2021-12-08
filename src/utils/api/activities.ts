import cloneDeep from 'lodash.clonedeep'

export function formatTrainingPlanData(data: any) {
  const dataClone = cloneDeep(data)

  if (!dataClone.account_id) {
    delete dataClone.account_id
  }

  dataClone.days.forEach((day: any) => {
    day.activities.forEach((activity: any, index: number) => {
      activity.sort_order = index

      activity.items.forEach((item: any, index: number) => {
        item.sort_order = index

        Object.keys(item.info).forEach((infoKey) => {
          item.info[infoKey] = Number(item.info[infoKey])
        })
      })
    })
  })

  return dataClone
}
