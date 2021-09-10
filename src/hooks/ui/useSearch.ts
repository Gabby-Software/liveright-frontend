import debounce from 'lodash.debounce'
import { useState } from 'react'

export interface UseSearch {
  search: string
  onSearch: (e: any) => void
}

export default function useSearch(): UseSearch {
  const [search, setSearch] = useState('')

  const onSearch = debounce((e) => {
    setSearch(e)
  }, 400)

  return {
    onSearch,
    search
  }
}
