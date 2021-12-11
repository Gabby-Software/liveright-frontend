import cloneDeep from 'lodash.clonedeep'
import moment from 'moment'

import { DATE_RENDER_FORMAT } from '../date'

export function formatRevisionLabel(from: string, to: string) {
  return `from ${moment(new Date(from)).format(DATE_RENDER_FORMAT)} to ${moment(
    new Date(to)
  ).format(DATE_RENDER_FORMAT)}`
}

export function formatTrainingPlanData(data: any) {
  const dataClone = cloneDeep(data)

  if (!dataClone.account_id) {
    delete dataClone.account_id
  }

  dataClone.days = dataClone.days.map((day: any) => {
    return {
      name: day.name,
      activities: day.activities.map((activity: any, index: number) => {
        return {
          name: activity.name,
          time: activity.time,
          sort_order: index,
          items: activity.items.map((item: any, index: number) => {
            return {
              name: item.name,
              link: item.link,
              sort_order: index,
              info: Object.keys(item.info).reduce((acc, cur) => {
                return {
                  ...acc,
                  [cur]: Number(item.info[cur])
                }
              }, {})
              // info: Object.keys(item.info).forEach((infoKey) => {
              //   item.info[infoKey] = Number(item.info[infoKey])
              // })
            }
          })
        }
      })
    }
  })

  return dataClone
}
