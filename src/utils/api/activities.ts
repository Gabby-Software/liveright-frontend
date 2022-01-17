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

export const getVersionOptions = (revisions: any[]) => {
  const schduledRev = revisions.filter((r) =>
    moment(new Date(r.scheduled_start_on)).isAfter()
  )
  const unSchduledRev = revisions.filter(
    (r) => !moment(new Date(r.scheduled_start_on)).isAfter()
  )
  const activeRev = findLatest(unSchduledRev)
  const unActiveRev = unSchduledRev.filter((r) => r._id !== activeRev?._id)

  const unActiveOptions = unActiveRev.map((r) => ({
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
    .concat([{ label: 'Active Version', value: activeRev?._id }])
    .concat(scheduledOptions)
}

export function formatPlanData(data: any) {
  const dataClone = cloneDeep(data)

  if (!dataClone.account_id) {
    delete dataClone.account_id
  }

  dataClone.days = dataClone.days.map((day: any) => {
    return {
      ...(typeof day.name === 'string' && { name: day.name }),
      save_as_template: day.save_as_template,
      activities: day.activities.map((activity: any, index: number) => {
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

export function formatSplitData(data: any) {
  const dataClone = cloneDeep(data)

  if (!dataClone.account_id) {
    delete dataClone.account_id
  }

  dataClone.days = dataClone.days.map((day: any) => {
    return {
      ...(typeof day.name === 'string' && { name: day.name }),
      training_plan_day: {
        ...(typeof day.training_plan_day.name === 'string' && {
          name: day.training_plan_day.name
        }),
        activities: day.training_plan_day.activities?.map(
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

  return dataClone
}
