import moment from 'moment'
import { useMemo } from 'react'

export const useDataFMConvert = (data: any) => {
  return useMemo(() => {
    if (data) {
      return data.map((item: any) => {
        return {
          id: item._id,
          created: item.name,
          client: item.account.user.full_name,
          name: moment(item.created_at).format('DD-MM-YYYY')
        }
      })
    } else {
      return []
    }
  }, [data])
}

export const useDataMealPlansConvert = (data: any) => {
  return useMemo(() => {
    if (data) {
      return data?.map((item: any) => {
        return {
          id: item._id,
          created: item.name,
          client: item.account.user.full_name,
          meals: 5,
          name: moment(item.created_at).format('DD-MM-YYYY')
        }
      })
    } else {
      return []
    }
  }, [data])
}

export const useDataDietPlansConvert = (data: any) => {
  return useMemo(() => {
    if (data) {
      return data.map((item: any) => {
        return {
          id: item._id,
          created: item.name,
          client: item.account.user.full_name,
          days: 5,
          name: moment(item.created_at).format('DD-MM-YYYY')
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
