import { useState } from 'react'

export interface UseFilters<T> {
  filters: T
  onFilter: (name: keyof T, value: any) => void
}

export default function useFilters<T>(): UseFilters<T> {
  const [filters, setFilters] = useState({})

  const onFilter = (name: keyof T, value: any) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return {
    filters: filters as T,
    onFilter
  }
}
