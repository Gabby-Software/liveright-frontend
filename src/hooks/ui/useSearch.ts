import debounce from 'lodash.debounce'
import { useState } from 'react'

export interface UseSearch {
  search: string
  onSearch: (e: any) => void
}

export default function useSearch(cb?: any): UseSearch {
  const [search, setSearch] = useState('')

  const onSearch = debounce((e) => {
    cb?.()
    setSearch(e)
  }, 400)

  return {
    onSearch,
    search
  }
}
