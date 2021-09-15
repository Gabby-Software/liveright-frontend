import { useCallback } from 'react'
import useSWRInfinite from 'swr/infinite'

import { stringifyURL } from '../../utils/query'

export interface UseSwrInfinite<T> {
  loadMore: () => void
  resetPage: () => void
  data: T[]
  isLoading: boolean
  hasMore: boolean
  page: number
  mutate: any
  isEmpty: boolean
}

function getKey(url: string, page: number, params: any) {
  return stringifyURL(url, { page: page + 1, ...params })
}

export default function useSwrInfinite<T>(
  url: string,
  params: any,
  fetcher: any
): UseSwrInfinite<T> {
  const { error, data, size, setSize, mutate } = useSWRInfinite(
    (page: number) => (url ? getKey(url, page, params) : null),
    fetcher,
    {
      revalidateIfStale: false
    }
  )

  const loadMore = useCallback(() => {
    setSize((size) => size + 1)
  }, [])

  const resetPage = () => {
    setSize(1)
  }

  const isLoading = !error && !data
  const isLoadingMore =
    isLoading || (data && typeof data[size - 1] === 'undefined')
  const isEmpty = data ? !data[0].length : true
  const hasMore =
    !isEmpty && data && data[size - 1]
      ? data[size - 1].length === params.per_page
      : false

  return {
    loadMore,
    resetPage,
    data: data ? [].concat(...data) : [],
    isLoading: !!isLoadingMore,
    isEmpty,
    hasMore,
    page: size + 1,
    mutate
  }
}
