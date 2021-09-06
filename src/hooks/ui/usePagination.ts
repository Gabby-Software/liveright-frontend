import { useState } from 'react'

export interface UsePagination {
  page: number
  onPage: (page: number) => void
}

export default function usePagination(): UsePagination {
  const [page, setPage] = useState(1)

  const onPage = (page: number) => {
    setPage(page)
  }

  return {
    page,
    onPage
  }
}
