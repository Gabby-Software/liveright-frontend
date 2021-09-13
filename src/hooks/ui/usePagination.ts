import { useEffect, useState } from 'react'

export interface UsePagination {
  page: number
  onPage: (page: number) => void
  onResetPage: () => void
}

export default function usePagination(deps: any[] = []): UsePagination {
  const [page, setPage] = useState(1)

  const onPage = (page: number) => {
    setPage(page)
  }

  const onResetPage = () => {
    setPage(1)
  }

  useEffect(() => {
    setPage(1)
  }, deps)

  return {
    page,
    onPage,
    onResetPage
  }
}
