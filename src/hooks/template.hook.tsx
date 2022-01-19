import moment from 'moment'
import { useMemo } from 'react'

export const useDataFMConvert = (data: any) => {
  return useMemo(() => {
    return data.map((item: any) => {
      return {
        id: item._id,
        created: item.name,
        client: item.account.user.full_name,
        name: moment(item.created_at).format('DD-MM-YYYY')
      }
    })
  }, [data])
}

export const useDataMealsConvert = (data: any) => {
  return useMemo(() => {
    return data.map((item: any) => {
      return {
        id: item._id,
        created: item.name,
        client: 'name',
        name: moment(item.created_at).format('DD-MM-YYYY')
      }
    })
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
