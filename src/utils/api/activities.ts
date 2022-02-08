import cloneDeep from 'lodash.clonedeep'
import moment from 'moment'

import { DATE_MONTH_RENDER_FORMAT } from '../date'

export const findLatest = (
  array: {
    updated_at: string
    [key: string]: any
  }[]
) => {
  const lastestDate = new Date(
    Math.max(...array.map((e) => new Date(e.updated_at).getTime()))
  )
  const lastestObject = array.find((a) =>
    moment(a.updated_at).isSame(lastestDate)
  )
  return lastestObject
}

export const findRevByStatus = (
  array: {
    status: string
    [key: string]: any
  }[],
  status: string
): any[] => {
  return array?.filter((a) => a.status === status)
}

export const getActiveOrLatestRev = (plan: {
  status: string
  revisions: {
    status: string
    [key: string]: any
  }[]
  [key: string]: any
}): any => {
  return (
    findRevByStatus(plan?.revisions, 'active')?.[0] ||
    plan?.revisions?.[plan?.revisions?.length - 1]
  )
}

export const getStatus = (plan: {
  status: string
  revisions: {
    status: string
    [key: string]: any
  }[]
  [key: string]: any
}) => {
  const activeRev = findRevByStatus(plan.revisions, 'active')
  const scheduledRevs = findRevByStatus(plan.revisions, 'scheduled')

  if (activeRev.length && scheduledRevs.length) {
    return 'Active/Scheduled'
  }

  return getActiveOrLatestRev(plan)?.status
}

export const getVersionOptions = (revisions: any[]) => {
  const schduledRev = findRevByStatus(revisions, 'scheduled')
  const inActiveRev = findRevByStatus(revisions, 'inactive')
  const activeRev = findRevByStatus(revisions, 'active')

  const unActiveOptions = inActiveRev.map((r) => ({
    label: `Version ${moment(new Date(r.updated_at)).format(
      DATE_MONTH_RENDER_FORMAT
    )}`,
    value: r._id
  }))

  const scheduledOptions = schduledRev.map((r) => ({
    label: `Scheduled on ${moment(new Date(r.scheduled_start_on)).format(
      DATE_MONTH_RENDER_FORMAT
    )}`,
    value: r._id
  }))

  return unActiveOptions
    .concat(
      activeRev?.[0]?._id
        ? [{ label: 'Active Version', value: activeRev?.[0]?._id }]
        : []
    )
    .concat(scheduledOptions)
}

export function formatPlanData(
  data: any,
  infoType: 'string' | 'number' = 'string'
) {
  const dataClone = cloneDeep(data)

  if (!dataClone.account_id) {
    delete dataClone.account_id
  }
  /**
   * day.is_day_target is only applicable for Diet Plans
   */
  dataClone.days = dataClone.days?.map((day: any) => {
    return {
      ...(typeof day.name === 'string' && { name: day.name }),
      ...(day.is_day_target &&
        day.custom_target && {
          is_day_target: day.is_day_target,
          custom_target: day.custom_target
        }),
      save_as_template: day.save_as_template,
      activities: day.is_day_target
        ? []
        : day.activities.map((activity: any, index: number) => {
            return {
              name: activity.name,
              time: activity.time,
              sort_order: index,
              save_as_template: activity.save_as_template,
              items: activity.items.map((item: any, index: number) => {
                return {
                  sort_order: index,
                  ...(typeof item.is_superset === 'boolean' && {
                    is_superset: item.is_superset
                  }),
                  data: !item.is_superset
                    ? {
                        name: item.data.name,
                        save_as_template: item.data.save_as_template,
                        ...(typeof item.data.link === 'string' && {
                          link: item.data.link
                        }),
                        info: Object.keys(item.data.info).reduce((acc, cur) => {
                          return {
                            ...acc,
                            [cur]:
                              infoType === 'string'
                                ? String(item.data.info[cur] || '')
                                : Number(item.data.info[cur]) || 0
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
                              [cur]:
                                infoType === 'string'
                                  ? String(data.info[cur] || '')
                                  : Number(data.info[cur]) || 0
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

export function formatSplitData(data: any) {
  const dataClone = cloneDeep(data)

  if (!dataClone.account_id) {
    delete dataClone.account_id
  }

  console.log(dataClone.days)

  dataClone.days = dataClone.days?.map((day: any) => {
    return {
      ...(typeof day.name === 'string' && { name: day.name }),
      training_plan_activities: day.training_plan_activities?.map(
        (activity: any, index: number) => {
          return {
            name: activity.name,
            time: activity.time,
            sort_order: index,
            items: activity.items?.map((item: any, index: number) => {
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
                          [cur]: String(item.data.info[cur])
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
                            [cur]: String(data.info[cur])
                          }
                        }, {})
                      }
                    })
              }
            })
          }
        }
      ),
      diet_plan_day: {
        ...(typeof day.diet_plan_day.name === 'string' && {
          name: day.diet_plan_day.name
        }),
        activities: day.diet_plan_day.activities?.map(
          (activity: any, index: number) => {
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
          }
        )
      },
      items: day.items.map((item: any, index: number) => {
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
                      : item.data.info[cur]
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
                      [cur]: data.info[cur]
                    }
                  }, {})
                }
              })
        }
      })
    }
  })

  return dataClone
}
