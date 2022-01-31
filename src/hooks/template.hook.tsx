import moment from 'moment'
import { useMemo } from 'react'

export const useDataFMConvert = (data: any, trainerId: number) => {
  return useMemo(() => {
    if (data) {
      return data.map((item: any) => {
        return {
          id: item._id,
          name: item.name,
          client:
            item.account_id === trainerId ? '-' : item.account.user.full_name,
          created: moment(item.created_at).format('DD-MM-YYYY')
        }
      })
    } else {
      return []
    }
  }, [data])
}

export const useDataTSConvert = (data: any, trainerId: number) => {
  return useMemo(() => {
    if (data) {
      return data.map((item: any) => {
        return {
          id: item._id,
          client:
            item.account_id === trainerId ? '-' : item.account.user.full_name,
          name: item.name,
          created: moment(item.created_at).format('DD-MM-YYYY'),
          days: item.days_count
        }
      })
    } else {
      return []
    }
  }, [data])
}

export const useDataMealPlansConvert = (data: any, trainerId: number) => {
  return useMemo(() => {
    if (data) {
      return data?.map((item: any) => {
        return {
          id: item._id,
          revisionId: item.revision_id,
          name: item.name,
          created: moment(item.created_at).format('DD-MM-YYYY'),
          client:
            item.account_id === trainerId ? '-' : item.account.user.full_name,
          meals: item?.activities?.length
        }
      })
    } else {
      return []
    }
  }, [data])
}

export const useDataDietPlansConvert = (data: any, trainerId: number) => {
  return useMemo(() => {
    if (data) {
      return data.map((item: any) => {
        return {
          id: item._id,
          created: moment(item.created_at).format('DD-MM-YYYY'),
          client:
            item.account_id === trainerId ? '-' : item.account.user.full_name,
          days: item.days_count,
          name: item.name
        }
      })
    } else {
      return []
    }
  }, [data])
}

export const useNutrientsConvert = (data: any) => {
  return useMemo(() => {
    if (data) {
      return Object.keys(data).map((item: any) => {
        return {
          name: item,
          value: data[item] + 'g'
        }
      })
    } else {
      return []
    }
  }, [data])
}

export const useFoodInfoConvert = (data: any) => {
  return useMemo(() => {
    if (data) {
      return Object.keys(data).map((item: any) => {
        return {
          name: item,
          value: data[item] + 'g'
        }
      })
    } else {
      return []
    }
  }, [data])
}
