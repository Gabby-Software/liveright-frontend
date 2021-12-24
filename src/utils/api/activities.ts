import cloneDeep from 'lodash.clonedeep'
import moment from 'moment'

import { DATE_RENDER_FORMAT } from '../date'

export function formatRevisionLabel(rev: any) {
  const from = rev.scheduled_start_on
  const status = rev.status

  if (status === 'active') return 'Active version'
  else if (status === 'scheduled' && moment(new Date(from)).isAfter()) {
    return `Scheduled ${moment(new Date(from)).format(DATE_RENDER_FORMAT)}`
  } else {
    return `Version ${moment(new Date(rev.updated_at)).format(
      DATE_RENDER_FORMAT
    )}`
  }
}

export function formatPlanData(data: any) {
  const dataClone = cloneDeep(data)

  if (!dataClone.account_id) {
    delete dataClone.account_id
  }

  dataClone.days = dataClone.days.map((day: any) => {
    return {
      ...(typeof day.name === 'string' && { name: day.name }),
      activities: day.activities.map((activity: any, index: number) => {
        return {
          name: activity.name,
          time: activity.time,
          sort_order: index,
          items: activity.items.map((item: any, index: number) => {
            return {
              sort_order: index,
              ...(typeof item.is_superset === 'boolean' && {
                is_superset: item.is_superset
              }),
              data: !item.is_superset
                ? {
                    name: item.data.name,
                    ...(typeof item.data.link === 'string' && {
                      link: item.data.link
                    }),
                    info: Object.keys(item.data.info).reduce((acc, cur) => {
                      return {
                        ...acc,
                        [cur]: isNaN(Number(item.data.info[cur]))
                          ? item.data.info[cur]
                          : Number(item.data.info[cur])
                      }
                    }, {})
                  }
                : item.data.map((data: any, index: number) => {
                    return {
                      sort_order: index,
                      name: data.name,
                      link: data.link,
                      info: Object.keys(data.info).reduce((acc, cur) => {
                        return {
                          ...acc,
                          [cur]: Number(data.info[cur])
                        }
                      }, {})
                    }
                  })
            }
          })
        }
      })
    }
  })

  return dataClone
}